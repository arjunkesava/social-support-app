import cors from "cors";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";
import { helpMeWriteRateLimiter } from "./writingSuggestionRateLimit.js";
import type {
  BuildPromptParams,
  OpenAIErrorResponse,
  HelpMeWriteRequest,
  SituationField,
} from "./types.js";

dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const openaiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

if (process.env.TRUST_PROXY === "true" || process.env.TRUST_PROXY === "1") {
  app.set("trust proxy", 1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));

const fieldInstructions: Record<SituationField, string> = {
  financialSituation:
    "current financial situation, including income pressure, debts, assets, and urgent needs",
  employmentCircumstances:
    "employment circumstances, job stability, underemployment, unemployment, or income disruption",
  reasonForApplying:
    "reason for applying and how social support would help stabilize the applicant",
};

const sanitizeText = (value: unknown): string => {
  if (value === undefined || value === null || value === "") {
    return "Not provided";
  }

  return String(value).trim();
};

const buildPrompt = ({
  field,
  fieldLabel,
  existingText,
  personal,
  family,
  language = "en",
}: BuildPromptParams): string => {
  const fieldFocus =
    field in fieldInstructions
      ? fieldInstructions[field as SituationField]
      : fieldLabel;

  const languageInstruction =
    {
      en: "Write in English.",
      es: "Write in Spanish.",
      ar: "Write in Modern Standard Arabic.",
    }[language] ??
    `Write in the same language as the target field label (${fieldLabel}).`;

  return [
    "Write one concise, respectful first-person paragraph for a social support application.",
    languageInstruction,
    `Target field: ${fieldLabel}.`,
    `Focus only on: ${fieldFocus}.`,
    "Use only the applicant details below.",
    "Do not invent specific events, dates, diagnoses, debts, employers, benefit programs, or dollar amounts.",
    "You may describe general hardship implied by the provided status fields (for example unemployment or renting), but do not add new facts.",
    "Do not mention the applicant's name unless it already appears in the draft.",
    "Keep the paragraph less than 80 words. Be practical, sincere, and easy for a government support officer to review.",
    "Return only the paragraph text.",
    existingText
      ? [
          "Revise the draft below. Preserve any accurate facts the applicant already wrote.",
          "Improve clarity, tone, and completeness for this field.",
          "Do not add unrelated details from other application sections.",
          `Draft to revise:\n${existingText}`,
        ].join(" ")
      : "Create a fresh draft for this field.",
    "",
    "Applicant details from previous steps:",
    `Location: ${sanitizeText(personal?.city)}, ${sanitizeText(personal?.state)}, ${sanitizeText(personal?.country)}`,
    `Gender: ${sanitizeText(personal?.gender)}`,
    `Marital status: ${sanitizeText(family?.maritalStatus)}`,
    `Dependents: ${sanitizeText(family?.dependents)}`,
    `Employment status: ${sanitizeText(family?.employmentStatus)}`,
    `Monthly income: ${sanitizeText(family?.monthlyIncome)} ${sanitizeText(family?.currency)}`,
    `Housing status: ${sanitizeText(family?.housingStatus)}`,
  ].join("\n");
};

type OpenAIErrorLike = {
  status?: number;
  error?: { message?: string };
  message?: string;
  code?: string;
  cause?: {
    code?: string;
    cause?: {
      code?: string;
    };
  };
};

const getOpenAIErrorResponse = (error: unknown): OpenAIErrorResponse => {
  const err = error as OpenAIErrorLike;

  const certificateErrorCode =
    err?.cause?.cause?.code || err?.cause?.code || err?.code;

  if (certificateErrorCode === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY") {
    return {
      status: 502,
      message:
        "Unable to connect to OpenAI because Node could not verify the local TLS certificate chain. Configure NODE_EXTRA_CA_CERTS with your local or corporate CA certificate.",
    };
  }

  const status = err?.status;
  const apiMessage = err?.error?.message || err?.message;

  if (status === 401) {
    return {
      status: 401,
      message: "OpenAI authentication failed. Check your API key.",
    };
  }

  if (status === 429) {
    return {
      status: 429,
      message: "OpenAI rate limit reached. Please wait a moment and try again.",
    };
  }

  if (status === 400) {
    return {
      status: 400,
      message: apiMessage || "Invalid request to OpenAI.",
    };
  }

  if (status && status >= 500) {
    return {
      status: 502,
      message: "OpenAI is temporarily unavailable. Please try again.",
    };
  }

  return {
    status: 502,
    message: "Unable to generate a suggestion right now. Please try again.",
  };
};

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post(
  "/api/help-me-write",
  helpMeWriteRateLimiter,
  async (req: Request, res: Response) => {
    const {
      field,
      fieldLabel,
      existingText = "",
      personal,
      family,
    } = (req.body as HelpMeWriteRequest) || {};

    if (!field || !fieldLabel || !personal || !family) {
      return res
        .status(400)
        .json({ message: "Missing required suggestion details." });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res
        .status(500)
        .json({ message: "OpenAI API key is not configured." });
    }

    try {
      const completion = await openai.chat.completions.create({
        model: openaiModel,
        messages: [
          {
            role: "system",
            content:
              "You help applicants write concise, respectful first-person statements for social support applications. Reply with only the suggested paragraph text—no headings, quotes, or commentary.",
          },
          {
            role: "user",
            content: buildPrompt({
              field,
              fieldLabel,
              existingText,
              personal,
              family,
            }),
          },
        ],
        temperature: 0.7,
      });

      const suggestion = completion.choices[0]?.message?.content?.trim();

      if (!suggestion) {
        return res.status(502).json({
          message: "OpenAI returned an empty suggestion. Please try again.",
        });
      }

      return res.json({ suggestion });
    } catch (error) {
      console.error("OpenAI suggestion error:", error);

      const { status, message } = getOpenAIErrorResponse(error);
      return res.status(status).json({ message });
    }
  },
);

app.listen(port, () => {
  console.log(`Help Me Write backend is running on http://localhost:${port}`);
});
