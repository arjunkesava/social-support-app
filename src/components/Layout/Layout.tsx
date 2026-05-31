import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useFormContext } from '../../context/FormContext';
import { getLayoutThemeOptions, mainWrapperStyles, contentContainerStyles } from './styles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeMode, language } = useFormContext();

  const theme = useMemo(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
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
