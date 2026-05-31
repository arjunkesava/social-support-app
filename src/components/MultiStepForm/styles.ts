import type { SxProps, Theme } from '@mui/material';

export const wizardCardStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: '850px',
  margin: '0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box',
  border: (theme) => 
    theme.palette.mode === 'light'
      ? '1px solid rgba(170, 59, 255, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
};

export const cardHeaderStyles: SxProps<Theme> = {
  padding: { xs: '1.5rem', sm: '2rem 2.5rem' },
  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
  background: (theme) => 
    theme.palette.mode === 'light'
      ? 'rgba(170, 59, 255, 0.02)'
      : 'rgba(255, 255, 255, 0.01)',
};

export const cardContentStyles: SxProps<Theme> = {
  padding: { xs: '1.5rem', sm: '2.5rem' },
  '&:last-child': {
    paddingBottom: { xs: '1.5rem', sm: '2.5rem' },
  },
};

export const stepperStyles: SxProps<Theme> = {
  marginBottom: { xs: '1.5rem', sm: '2.5rem' },
  // Smooth animations for stepper icons
  '& .MuiStepIcon-root': {
    transition: 'all 0.3s ease',
    '&.Mui-active': {
      transform: 'scale(1.15)',
    },
  },
  // Adjust label text sizes responsive
  '& .MuiStepLabel-label': {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    fontWeight: 500,
  },
};

export const formActionContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: { xs: '2rem', sm: '3rem' },
  paddingTop: '1.5rem',
  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
};

export const formFieldGridStyles: SxProps<Theme> = {
  rowGap: { xs: '1.25rem', sm: '1.75rem' },
  columnGap: { xs: '1.25rem', sm: '1.5rem' },
};

// Step Success styling
export const successContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  paddingY: { xs: '1rem', sm: '2rem' },
};

export const successIconStyles: SxProps<Theme> = {
  fontSize: { xs: '3.5rem', sm: '4.5rem' },
  color: 'secondary.main',
  marginBottom: '1.5rem',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.08)' },
    '100%': { transform: 'scale(1)' },
  },
};

export const summarySectionCardStyles: SxProps<Theme> = {
  textAlign: 'start',
  width: '100%',
  marginTop: '2rem',
  padding: { xs: '1.25rem', sm: '2rem' },
  borderRadius: '12px',
  border: (theme) => `1px solid ${theme.palette.divider}`,
  background: (theme) =>
    theme.palette.mode === 'light' ? '#fbfbfb' : '#181820',
};

export const reviewGridLabelStyles: SxProps<Theme> = {
  fontWeight: 600,
  color: 'text.secondary',
  fontSize: '0.875rem',
  marginBottom: '0.25rem',
};

export const reviewGridValueStyles: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: '1rem',
  wordBreak: 'break-word',
};
