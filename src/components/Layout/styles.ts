import type { SxProps, Theme } from '@mui/material';

export const getLayoutThemeOptions = (mode: 'light' | 'dark', direction: 'ltr' | 'rtl') => {
  return {
    direction,
    palette: {
      mode,
      primary: {
        main: '#aa3bff', // Premium Accent Purple
        light: '#c084fc',
        dark: '#7e22ce',
      },
      secondary: {
        main: '#10b981', // Emerald Green for success/secondary points
      },
      background: {
        default: mode === 'light' ? '#fcfbfd' : '#0d0d11',
        paper: mode === 'light' ? '#ffffff' : '#14141a',
      },
      text: {
        primary: mode === 'light' ? '#1c1921' : '#f3f4f6',
        secondary: mode === 'light' ? '#6b6375' : '#9ca3af',
      },
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      h1: {
        fontWeight: 800,
        fontSize: '2rem',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 700,
        fontSize: '1.5rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      button: {
        textTransform: 'none' as const,
        fontWeight: 600,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 10px 30px -10px rgba(170, 59, 255, 0.08)'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  };
};

export const mainWrapperStyles: SxProps<Theme> = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  backgroundColor: 'background.default',
  color: 'text.primary',
};

export const contentContainerStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: { xs: '1.5rem 1rem', sm: '2.5rem 2rem', md: '4rem 2rem' },
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  boxSizing: 'border-box',
};
