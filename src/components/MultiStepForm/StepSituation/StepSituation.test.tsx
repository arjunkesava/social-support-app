import { screen, fireEvent, waitFor } from "@testing-library/react";
import StepSituation from "./StepSituation";
import { describe, it, expect } from "vitest";
import "../../../i18n/config";
import { renderWithProviders } from "../../../test/testUtils";

describe("StepSituation Form Component", () => {
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
