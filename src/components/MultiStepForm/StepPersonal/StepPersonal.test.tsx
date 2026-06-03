import "../../../i18n/config";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../../test/testUtils";
import StepPersonal from "./StepPersonal";

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
