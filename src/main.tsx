import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FormContextProvider } from "./context/FormContext.tsx";
import "./i18n/config"; // Import i18n setup

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </StrictMode>,
);
