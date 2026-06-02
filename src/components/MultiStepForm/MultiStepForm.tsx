import React, { Suspense } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StepFormSkeleton from './StepFormSkeleton';
import {
  wizardCardStyles,
  cardHeaderStyles,
  cardContentStyles,
  stepperStyles,
  headerTypographyStyles,
  activeStepFormStyles,
} from './styles';

const stepPathIndexes: Record<string, number> = {
  '/personal': 0,
  '/family': 1,
  '/situation': 2,
  '/success': 3,
};

export const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeRouteStep = stepPathIndexes[pathname] ?? 0;

  const steps = [
    t('steps.personal'),
    t('steps.financial'),
    t('steps.situation'),
  ];

  return (
    <Card sx={wizardCardStyles} className="form-wizard-card">
      {/* Dynamic Header based on active step */}
      <CardHeader
        sx={cardHeaderStyles}
        title={
          <Typography variant="h2" sx={headerTypographyStyles}>
            {activeRouteStep < 3 ? steps[activeRouteStep] : t('steps.success')}
          </Typography>
        }
      />

      <CardContent sx={cardContentStyles}>
        {/* MUI Stepper - only show or customize if form is not completed */}
        <Box sx={{ width: '100%' }}>
          <Stepper 
            activeStep={activeRouteStep} 
            sx={stepperStyles}
            alternativeLabel
            aria-label="Application progress"
          >
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: React.ReactNode } = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          {/* Active Step Form Content */}
          <Box sx={activeStepFormStyles}>
            <Suspense fallback={<StepFormSkeleton />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default MultiStepForm;
