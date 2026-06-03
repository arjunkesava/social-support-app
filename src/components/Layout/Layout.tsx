import React, { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useFormContext } from "../../context/FormContext.shared";
import {
  getLayoutThemeOptions,
  mainWrapperStyles,
  contentContainerStyles,
} from "./styles";
import type { LayoutProps } from "./types";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeMode, language } = useFormContext();

  const theme = useMemo(() => {
    const direction = language === "ar" ? "rtl" : "ltr";
    return createTheme(getLayoutThemeOptions(themeMode, direction));
  }, [themeMode, language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={mainWrapperStyles} className="app-main-layout">
        <Box
          component="main"
          id="main-content"
          sx={contentContainerStyles}
          tabIndex={-1} // Allow keyboard focus skip-link targeting if needed
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
