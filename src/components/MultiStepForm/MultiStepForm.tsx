import React from 'react';
import { Card, CardHeader, CardContent, Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';
import StepPersonal from './StepPersonal';
import StepFamily from './StepFamily';
import StepSituation from './StepSituation';
import StepSuccess from './StepSuccess';
import {
  wizardCardStyles,
  cardHeaderStyles,
  cardContentStyles,
  stepperStyles,
} from './styles';

export const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const { activeStep } = useFormContext();

  const steps = [
    t('steps.personal'),
    t('steps.financial'),
    t('steps.situation'),
  ];

  const renderActiveStepContent = () => {
    switch (activeStep) {
      case 0:
        return <StepPersonal />;
      case 1:
        return <StepFamily />;
      case 2:
        return <StepSituation />;
      case 3:
        return <StepSuccess />;
      default:
        return <StepPersonal />;
    }
  };

  return (
    <Card sx={wizardCardStyles} className="form-wizard-card">
      {/* Dynamic Header based on active step */}
      <CardHeader
        sx={cardHeaderStyles}
        title={
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {activeStep < 3 ? steps[activeStep] : t('steps.success')}
          </Typography>
        }
      />

      <CardContent sx={cardContentStyles}>
        {/* MUI Stepper - only show or customize if form is not completed */}
        <Box sx={{ width: '100%' }}>
          <Stepper 
            activeStep={activeStep} 
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
          <Box sx={{ marginTop: { xs: '1.5rem', sm: '2rem' } }}>
            {renderActiveStepContent()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default MultiStepForm;
