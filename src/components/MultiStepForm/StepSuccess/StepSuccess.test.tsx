import { screen, fireEvent } from "@testing-library/react";
import StepSuccess from "./StepSuccess";
import { describe, it, expect } from "vitest";
import "../../../i18n/config";
import { renderWithProviders } from "../../../test/testUtils";

describe("StepSuccess Component", () => {
  it("should render the final summary and the start over action button", () => {
    renderWithProviders(<StepSuccess />);

    const successTitle = screen.getByRole("heading", { level: 2 });
    const restartButton = screen.getByRole("button", { name: /start over/i });

    fireEvent.click(restartButton);

    expect(successTitle).toBeInTheDocument();
    expect(restartButton).toBeInTheDocument();
  });
});
