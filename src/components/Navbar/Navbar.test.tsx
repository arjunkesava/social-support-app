import { screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { describe, it, expect } from "vitest";
import "../../i18n/config";
import { renderWithProviders } from "../../test/testUtils";

describe("Navbar Component", () => {
  it("should render the brand title and navigation controls", () => {
    renderWithProviders(<Navbar />);

    const headerTitle = screen.getByRole("heading", { level: 1 });
    const languageSelect = screen.getByRole("combobox", { name: /language/i });

    expect(headerTitle).toBeInTheDocument();
    expect(languageSelect).toBeInTheDocument();
  });
});
