import { screen, fireEvent, waitFor } from "@testing-library/react";
import StepPersonal from "./StepPersonal";
import { describe, it, expect } from "vitest";
import "../../../i18n/config";
import { renderWithProviders } from "../../../test/testUtils";

describe("StepPersonal Form Component", () => {
  it("should render form inputs and trigger validation errors on invalid values", async () => {
    renderWithProviders(<StepPersonal />);

    const nameField = screen.getByLabelText(/full name/i);
    const phoneField = screen.getByLabelText(/phone number/i);
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.change(nameField, { target: { value: "Jane Doe" } });
    fireEvent.change(phoneField, { target: { value: "123" } });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid phone number/i),
      ).toBeInTheDocument();
    });
  });
});
