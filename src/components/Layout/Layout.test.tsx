import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { renderWithProviders } from "../../test/testUtils";
import { Layout } from "./Layout";

describe("Layout Component", () => {
  it("should render children within the ThemeProvider and Layout shell", () => {
    const testMessage = "Frosted Glass Layout Shell";

    renderWithProviders(
      <Layout>
        <div data-testid="test-child">{testMessage}</div>
      </Layout>,
    );

    const childElement = screen.getByTestId("test-child");
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent(testMessage);
  });
});
