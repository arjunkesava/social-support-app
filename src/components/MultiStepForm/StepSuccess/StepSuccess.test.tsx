import { screen, fireEvent } from "@testing-library/react";
import StepSuccess from "./StepSuccess";
import { describe, it, expect, vi } from "vitest";
import "../../../i18n/config";
import { renderWithProviders } from "../../../test/testUtils";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("StepSuccess Component", () => {
  it("renders the success title, all summary sections, and start over button", () => {
    renderWithProviders(<StepSuccess />);

    expect(
      screen.getByRole("heading", { name: /application completed/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /personal details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /financial.*family/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /circumstance statements/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /start over/i }),
    ).toBeInTheDocument();
  });

  it("shows 'Not provided' for empty field values", () => {
    renderWithProviders(<StepSuccess />);

    const notProvidedElements = screen.getAllByText(/not provided/i);
    expect(notProvidedElements.length).toBeGreaterThanOrEqual(1);
  });

  it("calls navigate to /personal on start over", () => {
    renderWithProviders(<StepSuccess />);

    fireEvent.click(screen.getByRole("button", { name: /start over/i }));

    expect(navigateMock).toHaveBeenCalledWith("/personal");
  });

  it("renders all personal info fields in the summary", () => {
    renderWithProviders(<StepSuccess />);

    expect(screen.getByText(/full name/i)).toBeInTheDocument();
    expect(screen.getByText(/emirates id/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
    expect(screen.getByText(/gender/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/^address$/i)).toBeInTheDocument();
    expect(screen.getByText(/city/i)).toBeInTheDocument();
    expect(screen.getByText(/^state$/i)).toBeInTheDocument();
    expect(screen.getByText(/country/i)).toBeInTheDocument();
  });

  it("renders all financial info fields in the summary", () => {
    renderWithProviders(<StepSuccess />);

    expect(screen.getByText(/marital status/i)).toBeInTheDocument();
    expect(screen.getByText(/number of dependents/i)).toBeInTheDocument();
    expect(screen.getByText(/employment status/i)).toBeInTheDocument();
    expect(screen.getByText(/monthly income/i)).toBeInTheDocument();
    expect(screen.getByText(/housing status/i)).toBeInTheDocument();
  });

  it("renders all situation fields in the summary", () => {
    renderWithProviders(<StepSuccess />);

    expect(
      screen.getByText(/current financial situation/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/employment circumstances/i)).toBeInTheDocument();
    expect(screen.getByText(/reason for applying/i)).toBeInTheDocument();
  });
});
