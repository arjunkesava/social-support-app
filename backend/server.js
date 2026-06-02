import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';


dotenv.config({ path: fileURLToPath(new URL('.env', import.meta.url)) });
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '1mb' }));

const fieldInstructions = {
  financialSituation: 'current financial situation, including income pressure, debts, assets, and urgent needs',
  employmentCircumstances: 'employment circumstances, job stability, underemployment, unemployment, or income disruption',
  reasonForApplying: 'reason for applying and how social support would help stabilize the applicant',
};

const sanitizeText = (value) => {
  if (value === undefined || value === null || value === '') {
    return 'Not provided';
  }

  return String(value).trim();
};

const buildPrompt = ({ field, fieldLabel, existingText, personal, family }) => {
  const fieldFocus = fieldInstructions[field] || fieldLabel;

  return [
    'Write a concise, respectful first-person statement for a social support application.',
    `Target field: ${fieldLabel}.`,
    `Focus on: ${fieldFocus}.`,
    'Use only the applicant details provided. Do not invent specific events, diagnoses, debts, employers, or benefits.',
    'Keep it between 80 and 130 words, practical, sincere, and easy for a government support officer to understand.',
    existingText ? `Improve or continue this draft: ${existingText}` : 'Create a fresh draft for this field.',
    '',
    'Applicant details from previous steps:',
    `Name: ${sanitizeText(personal?.name)}`,
    `City: ${sanitizeText(personal?.city)}`,
    `State: ${sanitizeText(personal?.state)}`,
    `Country: ${sanitizeText(personal?.country)}`,
    `Marital status: ${sanitizeText(family?.maritalStatus)}`,
    `Dependents: ${sanitizeText(family?.dependents)}`,
    `Employment status: ${sanitizeText(family?.employmentStatus)}`,
    `Monthly income: ${sanitizeText(family?.monthlyIncome)}`,
    `Housing status: ${sanitizeText(family?.housingStatus)}`,
  ].join('\n');
};

const getOpenAIErrorResponse = (error) => {
  const certificateErrorCode = error?.cause?.cause?.code || error?.cause?.code || error?.code;

  if (certificateErrorCode === 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY') {
    return {
      status: 502,
      message:
        'Unable to connect to OpenAI because Node could not verify the local TLS certificate chain. Configure NODE_EXTRA_CA_CERTS with your local or corporate CA certificate.',
    };
  }

  if (error?.status === 401) {
    return {
      status: 401,
      message: 'OpenAI authentication failed. Check your API key.',
    };
  }

  return {
    status: 502,
    message: 'Unable to generate a suggestion right now. Please try again.',
  };
};

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/help-me-write', async (req, res) => {
  const { field, fieldLabel, existingText = '', personal, family } = req.body || {};

  if (!field || !fieldLabel || !personal || !family) {
    return res.status(400).json({ message: 'Missing required suggestion details.' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ message: 'GEMINI API key is not configured.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: buildPrompt({ field, fieldLabel, existingText, personal, family }),
    });

    return res.json({
      suggestion: response.text,
    });
  } catch (error) {
    console.error('Gemini AI suggestion error: ', error);

    const { status, message } = getOpenAIErrorResponse(error);
    return res.status(status).json({
      message,
    });
  }
});

app.listen(port, () => {
  console.log(`Help Me Write backend is running on http://localhost:${port}`);
});
