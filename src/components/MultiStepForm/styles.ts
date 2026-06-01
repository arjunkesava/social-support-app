import type { SxProps, Theme } from '@mui/material';

export const wizardCardStyles: SxProps<Theme> = {
  width: '100%',
  maxWidth: '850px',
  margin: '0 auto',
  overflow: 'hidden',
  boxSizing: 'border-box',
  borderRadius: '24px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Premium Glassmorphism
  backgroundColor: (theme) => 
    theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.45)' 
      : 'rgba(15, 15, 20, 0.45)',
  backdropFilter: 'blur(24px)',
  border: (theme) => 
    theme.palette.mode === 'light'
      ? '1px solid rgba(255, 255, 255, 0.5)'
      : '1px solid rgba(255, 255, 255, 0.06)',
      
  boxShadow: (theme) => 
    theme.palette.mode === 'light'
      ? '0 20px 50px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      : '0 30px 60px -25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
};

export const cardHeaderStyles: SxProps<Theme> = {
  padding: { xs: '1.5rem', sm: '2rem 2.5rem' },
  borderBottom: (theme) => 
    theme.palette.mode === 'light' 
      ? '1px solid rgba(0, 0, 0, 0.05)' 
      : '1px solid rgba(255, 255, 255, 0.05)',
  background: (theme) => 
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.1)',
};

export const cardContentStyles: SxProps<Theme> = {
  padding: { xs: '1.5rem', sm: '2.5rem' },
  '&:last-child': {
    paddingBottom: { xs: '1.5rem', sm: '2.5rem' },
  },
};

export const headerTypographyStyles: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: { xs: '1.25rem', sm: '1.5rem' },
};

export const activeStepFormStyles: SxProps<Theme> = {
  marginTop: { xs: '1.5rem', sm: '2rem' },
};

export const suggestionProgressSpinnerStyles: SxProps<Theme> = {
  alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 2, py: 4
};

export const suggestionStyles: SxProps<Theme> = {
  display: 'flex', flexDirection: 'column', gap: 2, pt: 1,
};

export const stepperStyles: SxProps<Theme> = {
  marginBottom: { xs: '2rem', sm: '3rem' },
  // Smooth animations for stepper icons
  '& .MuiStepIcon-root': {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&.Mui-active': {
      transform: 'scale(1.2)',
      filter: 'drop-shadow(0 4px 10px rgba(170, 59, 255, 0.3))',
    },
  },
  // Adjust label text sizes responsive
  '& .MuiStepLabel-label': {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    fontWeight: 600,
  },
};

export const formActionContainerStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: { xs: '2.5rem', sm: '3.5rem' },
  paddingTop: '1.5rem',
  borderTop: (theme) => 
    theme.palette.mode === 'light' 
      ? '1px solid rgba(0, 0, 0, 0.05)' 
      : '1px solid rgba(255, 255, 255, 0.05)',
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
  filter: 'drop-shadow(0 4px 12px rgba(16, 185, 129, 0.2))',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.06)' },
    '100%': { transform: 'scale(1)' },
  },
};

export const summarySectionCardStyles: SxProps<Theme> = {
  textAlign: 'start',
  width: '100%',
  marginTop: '2rem',
  padding: { xs: '1.25rem', sm: '2rem' },
  borderRadius: '16px',
  boxSizing: 'border-box',
  
  // Sleek inner glass cards
  backgroundColor: (theme) =>
    theme.palette.mode === 'light' 
      ? 'rgba(255, 255, 255, 0.3)' 
      : 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(8px)',
  border: (theme) => 
    theme.palette.mode === 'light'
      ? '1px solid rgba(0, 0, 0, 0.03)'
      : '1px solid rgba(255, 255, 255, 0.03)',
  
  boxShadow: (theme) =>
    theme.palette.mode === 'light' 
      ? 'inset 0 1px 0 rgba(255, 255, 255, 0.6)' 
      : 'inset 0 1px 0 rgba(255, 255, 255, 0.02)',
};

export const reviewGridLabelStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.secondary',
  fontSize: '0.8125rem',
  marginBottom: '0.25rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const reviewGridValueStyles: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.95rem',
  wordBreak: 'break-word',
};
