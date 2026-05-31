import type { SxProps, Theme } from '@mui/material';

export const navbarContainerStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto 2rem auto',
  padding: { xs: '1rem', sm: '1.25rem 2rem' },
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: { xs: '1rem', sm: '2rem' },
  borderRadius: '16px',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease',
  
  // Premium Glassmorphism
  backgroundColor: (theme) => 
    theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.7)' 
      : 'rgba(20, 20, 26, 0.7)',
  backdropFilter: 'blur(12px)',
  border: (theme) => 
    theme.palette.mode === 'light'
      ? '1px solid rgba(170, 59, 255, 0.1)'
      : '1px solid rgba(255, 255, 255, 0.05)',
  
  boxShadow: (theme) => 
    theme.palette.mode === 'light'
      ? '0 8px 32px 0 rgba(170, 59, 255, 0.04)'
      : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
};

export const headerTitleStyles: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: { xs: '1.25rem', sm: '1.5rem' },
  background: (theme) =>
    theme.palette.mode === 'light'
      ? 'linear-gradient(45deg, #aa3bff 30%, #6b21a8 90%)'
      : 'linear-gradient(45deg, #c084fc 30%, #e879f9 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.025em',
  textAlign: { xs: 'center', sm: 'left' },
  cursor: 'default',
};

export const navActionsContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: { xs: '1rem', sm: '1.5rem' },
  width: { xs: '100%', sm: 'auto' },
};

export const switchWrapperStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  color: 'text.secondary',
  fontSize: '0.875rem',
  fontWeight: 500,
};

export const selectLanguageStyles: SxProps<Theme> = {
  minWidth: 120,
  height: 40,
  borderRadius: '8px',
  '& .MuiSelect-select': {
    paddingY: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
};
