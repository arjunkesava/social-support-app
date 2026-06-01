import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext.shared';
import StepPersonal from './StepPersonal/StepPersonal';
import StepFamily from './StepFamily/StepFamily';
import StepSituation from './StepSituation/StepSituation';
import StepSuccess from './StepSuccess/StepSuccess';
import {
  wizardCardStyles,
  cardHeaderStyles,
  cardContentStyles,
  stepperStyles,
  headerTypographyStyles,
  activeStepFormStyles,
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
          <Typography variant="h2" sx={headerTypographyStyles}>
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
          <Box sx={activeStepFormStyles}>
            {renderActiveStepContent()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default MultiStepForm;
