import "../../../i18n/config";

import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../../test/testUtils";
import StepFamily from "./StepFamily";

describe("StepFamily Form Component", () => {
  it("should render family inputs and trigger error on negative dependents", async () => {
    renderWithProviders(<StepFamily />);

    const dependentsField = screen.getByLabelText(/number of dependents/i);
    const nextButton = screen.getByRole("button", { name: /next/i });

    fireEvent.change(dependentsField, { target: { value: "-2" } });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getByText(/dependents cannot be negative/i),
      ).toBeInTheDocument();
    });
  });
});
