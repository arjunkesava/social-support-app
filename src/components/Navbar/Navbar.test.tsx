import "../../i18n/config";

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test/testUtils";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  it("should render the brand title and navigation controls", () => {
    renderWithProviders(<Navbar />);

    const headerTitle = screen.getByRole("heading", { level: 1 });
    const languageSelect = screen.getByRole("combobox", { name: /language/i });

    expect(headerTitle).toBeInTheDocument();
    expect(languageSelect).toBeInTheDocument();
  });
});
