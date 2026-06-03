import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

import { FormContextProvider } from "../context/FormContext";

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <FormContextProvider>{children}</FormContextProvider>
      </MemoryRouter>
    ),
    ...options,
  });
}
