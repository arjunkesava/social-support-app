import axios, { type AxiosResponse, isAxiosError } from "axios";

import type { FormData } from "../context/FormContext.shared";

export interface ApplicationSubmissionResponse {
  applicationId: string;
  submittedAt: string;
}

export class ApplicationSubmissionError extends Error {
  readonly code: "TIMEOUT" | "NETWORK" | "SERVER";

  constructor(message: string, code: ApplicationSubmissionError["code"]) {
    super(message);
    this.name = "ApplicationSubmissionError";
    this.code = code;
  }
}

const MOCK_SUBMISSION_DELAY_MS = 1500;

const submissionClient = axios.create({
  baseURL: "/api",
  timeout: 30000,
  adapter: async (
    config,
  ): Promise<AxiosResponse<ApplicationSubmissionResponse>> => {
    await new Promise((resolve) =>
      setTimeout(resolve, MOCK_SUBMISSION_DELAY_MS),
    );

    const shouldFail =
      import.meta.env.VITE_MOCK_SUBMIT_FAIL === "true" ||
      import.meta.env.VITE_MOCK_SUBMIT_FAIL === "1";

    if (shouldFail) {
      return Promise.reject(
        new ApplicationSubmissionError("Mock submission failed.", "SERVER"),
      );
    }

    return {
      data: {
        applicationId: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  },
});

export const submitApplication = async (
  application: FormData,
  signal?: AbortSignal,
): Promise<ApplicationSubmissionResponse> => {
  try {
    const response = await submissionClient.post<ApplicationSubmissionResponse>(
      "/applications",
      application,
      { signal },
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApplicationSubmissionError) {
      throw error;
    }

    if (isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new ApplicationSubmissionError(
          "Submission timed out.",
          "TIMEOUT",
        );
      }

      throw new ApplicationSubmissionError(
        "Submission request failed.",
        "NETWORK",
      );
    }

    throw new ApplicationSubmissionError("Submission failed.", "SERVER");
  }
};
