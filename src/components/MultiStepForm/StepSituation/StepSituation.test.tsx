import { screen, fireEvent, waitFor } from "@testing-library/react";
import StepSituation from "./StepSituation";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import * as writingSuggestionRateLimitHook from "../../../hooks/useWritingSuggestionRateLimit";
import "../../../i18n/config";
import { renderWithProviders } from "../../../test/testUtils";
import {
  getWritingSuggestion,
  WritingSuggestionError,
} from "../../../services/writingSuggestions";
import {
  ApplicationSubmissionError,
  submitApplication,
} from "../../../services/applicationSubmission";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock("../../../services/writingSuggestions", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("../../../services/writingSuggestions")
    >();
  return {
    ...actual,
    getWritingSuggestion: vi.fn(),
  };
});

vi.mock("../../../services/applicationSubmission", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("../../../services/applicationSubmission")
    >();
  return {
    ...actual,
    submitApplication: vi.fn(),
  };
});

const validSituationText =
  "This is a valid description that meets the minimum length requirement.";

const fillValidSituationFields = () => {
  fireEvent.change(screen.getByLabelText(/current financial situation/i), {
    target: { value: validSituationText },
  });
  fireEvent.change(screen.getByLabelText(/employment circumstances/i), {
    target: { value: validSituationText },
  });
  fireEvent.change(screen.getByLabelText(/reason for applying/i), {
    target: { value: validSituationText },
  });
};

describe("StepSituation Form Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render descriptive textareas and enforce minimum character length", async () => {
    renderWithProviders(<StepSituation />);

    const financialTextArea = screen.getByLabelText(
      /current financial situation/i,
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(financialTextArea, { target: { value: "Too short" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/must be at least 15 characters/i),
      ).toBeInTheDocument();
    });
  });
});

describe("StepSituation AI suggestions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(
      writingSuggestionRateLimitHook,
      "useWritingSuggestionRateLimit",
    ).mockReturnValue({
      limitStatus: { allowed: true },
      tryConsumeRequest: vi.fn(() => ({ allowed: true })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the suggestion dialog, shows loading, then displays generated text", async () => {
    vi.mocked(getWritingSuggestion).mockResolvedValue(
      "Suggested financial situation text for the applicant.",
    );

    renderWithProviders(<StepSituation />);

    const [helpButton] = screen.getAllByRole("button", {
      name: /help me write/i,
    });
    fireEvent.click(helpButton);

    expect(screen.getByText(/generating a suggestion/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByLabelText(/suggested text/i)).toHaveValue(
        "Suggested financial situation text for the applicant.",
      );
    });

    expect(getWritingSuggestion).toHaveBeenCalledWith(
      expect.objectContaining({
        field: "financialSituation",
        existingText: "",
      }),
    );
  });

  it("applies an accepted suggestion to the matching field", async () => {
    vi.mocked(getWritingSuggestion).mockResolvedValue(
      "Accepted AI suggestion for financial situation.",
    );

    renderWithProviders(<StepSituation />);

    const [helpButton] = screen.getAllByRole("button", {
      name: /help me write/i,
    });
    fireEvent.click(helpButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/suggested text/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /accept/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/current financial situation/i)).toHaveValue(
        "Accepted AI suggestion for financial situation.",
      );
    });

    expect(screen.queryByLabelText(/suggested text/i)).not.toBeInTheDocument();
  });

  it("shows a timeout error when the suggestion request times out", async () => {
    vi.mocked(getWritingSuggestion).mockRejectedValue(
      new WritingSuggestionError("Writing suggestion timed out.", "TIMEOUT"),
    );

    renderWithProviders(<StepSituation />);

    const [helpButton] = screen.getAllByRole("button", {
      name: /help me write/i,
    });
    fireEvent.click(helpButton);

    await waitFor(() => {
      expect(
        screen.getByText(/writing suggestion took too long/i),
      ).toBeInTheDocument();
    });
  });

  it("shows a generic error when suggestion generation fails", async () => {
    vi.mocked(getWritingSuggestion).mockRejectedValue(
      new WritingSuggestionError(
        "We could not generate a suggestion right now. Please try again in a moment.",
        "SERVER",
      ),
    );

    renderWithProviders(<StepSituation />);

    const [helpButton] = screen.getAllByRole("button", {
      name: /help me write/i,
    });
    fireEvent.click(helpButton);

    await waitFor(() => {
      expect(
        screen.getByText(/could not generate a suggestion right now/i),
      ).toBeInTheDocument();
    });
  });
});

describe("StepSituation AI suggestion rate limiting", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("disables Help me write buttons during the cooldown period", async () => {
    vi.mocked(getWritingSuggestion).mockResolvedValue(
      "Suggested financial situation text for the applicant.",
    );

    renderWithProviders(<StepSituation />);

    const [helpButton] = screen.getAllByRole("button", {
      name: /help me write/i,
    });
    fireEvent.click(helpButton);

    await waitFor(() => {
      expect(screen.getByLabelText(/suggested text/i)).toHaveValue(
        "Suggested financial situation text for the applicant.",
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /discard/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    expect(getWritingSuggestion).toHaveBeenCalledTimes(1);

    const cooldownButtons = screen.getAllByRole("button", {
      name: /available in/i,
    });
    expect(cooldownButtons).toHaveLength(3);
    cooldownButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});

describe("StepSituation submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits valid data and navigates to the success page", async () => {
    vi.mocked(submitApplication).mockResolvedValue({
      applicationId: "app-123",
      submittedAt: "2026-06-03T00:00:00.000Z",
    });

    renderWithProviders(<StepSituation />);
    fillValidSituationFields();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(submitApplication).toHaveBeenCalledWith(
        expect.objectContaining({
          situation: expect.objectContaining({
            financialSituation: validSituationText,
            employmentCircumstances: validSituationText,
            reasonForApplying: validSituationText,
          }),
        }),
      );
    });

    expect(navigateMock).toHaveBeenCalledWith("/success");
  });

  it("shows a generic error when submission fails", async () => {
    vi.mocked(submitApplication).mockRejectedValue(
      new ApplicationSubmissionError("Submission failed.", "SERVER"),
    );

    renderWithProviders(<StepSituation />);
    fillValidSituationFields();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/could not submit your application right now/i),
      ).toBeInTheDocument();
    });

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("shows a timeout error when submission times out", async () => {
    vi.mocked(submitApplication).mockRejectedValue(
      new ApplicationSubmissionError("Submission timed out.", "TIMEOUT"),
    );

    renderWithProviders(<StepSituation />);
    fillValidSituationFields();

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/submission took too long/i)).toBeInTheDocument();
    });

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
