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
        main: '#10b981', // Emerald Green for success
      },
      background: {
        default: mode === 'light' ? '#fcfbfd' : '#0a0a0f',
        paper: mode === 'light' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 20, 26, 0.45)', // Frosted glass bases
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
            borderRadius: 12,
            boxShadow: 'none',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(4px)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.04)',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.06)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            boxShadow: mode === 'light' 
              ? '0 20px 40px -15px rgba(170, 59, 255, 0.06), 0 0 0 1px rgba(170, 59, 255, 0.04)'
              : '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
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
  // Sleek multi-blob frosted backdrop gradients
  background: (theme) => 
    theme.palette.mode === 'light'
      ? 'radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.6) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(243, 232, 255, 0.7) 0, transparent 50%), radial-gradient(at 50% 100%, rgba(254, 243, 199, 0.4) 0, transparent 50%), #f8f7fa'
      : 'radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.12) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(168, 85, 247, 0.12) 0, transparent 50%), radial-gradient(at 50% 100%, rgba(20, 20, 26, 0.8) 0, transparent 100%), #08080c',
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
