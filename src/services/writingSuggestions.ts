import axios, { isAxiosError } from "axios";

import type {
  FamilyFinancialInfo,
  PersonalInfo,
  SituationDescriptions,
} from "../context/FormContext.shared";

export type SituationField = keyof SituationDescriptions;

export interface WritingSuggestionRequest {
  field: SituationField;
  fieldLabel: string;
  existingText: string;
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
}

interface WritingSuggestionResponse {
  suggestion: string;
}

export type WritingSuggestionErrorCode =
  | "TIMEOUT"
  | "NETWORK"
  | "SERVER"
  | "RATE_LIMIT_COOLDOWN"
  | "RATE_LIMIT_QUOTA";

export class WritingSuggestionError extends Error {
  readonly code: WritingSuggestionErrorCode;
  readonly retryAfterMs?: number;

  constructor(
    message: string,
    code: WritingSuggestionErrorCode,
    retryAfterMs?: number,
  ) {
    super(message);
    this.name = "WritingSuggestionError";
    this.code = code;
    this.retryAfterMs = retryAfterMs;
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
  timeout: 25000,
});

type WritingSuggestionErrorResponse = {
  message?: string;
  code?: "COOLDOWN" | "QUOTA";
  retryAfterMs?: number;
};

const parseErrorResponse = (
  data: unknown,
): WritingSuggestionErrorResponse | undefined => {
  if (typeof data !== "object" || data === null) {
    return undefined;
  }

  return data as WritingSuggestionErrorResponse;
};

export const getWritingSuggestion = async (
  payload: WritingSuggestionRequest,
  signal?: AbortSignal,
): Promise<string> => {
  try {
    const response = await apiClient.post<WritingSuggestionResponse>(
      "/api/help-me-write",
      payload,
      { signal },
    );

    const suggestion = response.data.suggestion?.trim();
    if (!suggestion) {
      throw new WritingSuggestionError(
        "The server returned an empty suggestion. Please try again.",
        "SERVER",
      );
    }

    return suggestion;
  } catch (error) {
    if (error instanceof WritingSuggestionError) {
      throw error;
    }

    if (isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new WritingSuggestionError(
          "Writing suggestion timed out.",
          "TIMEOUT",
        );
      }

      const errorResponse = parseErrorResponse(error.response?.data);

      if (error.response?.status === 429 && errorResponse) {
        const retryAfterMs =
          typeof errorResponse.retryAfterMs === "number"
            ? errorResponse.retryAfterMs
            : undefined;

        const rateLimitMessage =
          errorResponse.message ?? "Rate limit exceeded. Please try again.";

        if (errorResponse.code === "COOLDOWN") {
          throw new WritingSuggestionError(
            rateLimitMessage,
            "RATE_LIMIT_COOLDOWN",
            retryAfterMs,
          );
        }

        if (errorResponse.code === "QUOTA") {
          throw new WritingSuggestionError(
            rateLimitMessage,
            "RATE_LIMIT_QUOTA",
            retryAfterMs,
          );
        }
      }

      const message =
        errorResponse?.message ??
        "Unable to generate a suggestion right now. Please try again.";

      throw new WritingSuggestionError(message, "SERVER");
    }

    throw new WritingSuggestionError(
      "Unable to generate a suggestion right now. Please try again.",
      "SERVER",
    );
  }
};
