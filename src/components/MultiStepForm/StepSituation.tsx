import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';
import type { SituationDescriptions } from '../../context/FormContext';
import { formFieldGridStyles, formActionContainerStyles } from './styles';

export const StepSituation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  
  const isRtl = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SituationDescriptions>({
    defaultValues: formData.situation,
    mode: 'onTouched',
  });

  const onSubmit = (data: SituationDescriptions) => {
    updateStepData('situation', data);
    setActiveStep(3); // Progress to Success step
  };

  const handleBack = () => {
    setActiveStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3} sx={formFieldGridStyles}>
        {/* Financial Situation Description */}
        <Grid size={12}>
          <TextField
            required
            id="situation-financial"
            label={t('situation.financial_situation')}
            placeholder={t('situation.financial_situation_placeholder')}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            {...register('financialSituation', {
              required: t('validation.required'),
              minLength: {
                value: 15,
                message: t('validation.min_length'),
              },
            })}
            error={!!errors.financialSituation}
            helperText={errors.financialSituation?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.financialSituation ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* Employment Circumstances Description */}
        <Grid size={12}>
          <TextField
            required
            id="situation-employment"
            label={t('situation.employment_circumstances')}
            placeholder={t('situation.employment_circumstances_placeholder')}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            {...register('employmentCircumstances', {
              required: t('validation.required'),
              minLength: {
                value: 15,
                message: t('validation.min_length'),
              },
            })}
            error={!!errors.employmentCircumstances}
            helperText={errors.employmentCircumstances?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.employmentCircumstances ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* Reason for Applying */}
        <Grid size={12}>
          <TextField
            required
            id="situation-reason"
            label={t('situation.reason_for_applying')}
            placeholder={t('situation.reason_for_applying_placeholder')}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            {...register('reasonForApplying', {
              required: t('validation.required'),
              minLength: {
                value: 15,
                message: t('validation.min_length'),
              },
            })}
            error={!!errors.reasonForApplying}
            helperText={errors.reasonForApplying?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.reasonForApplying ? 'true' : 'false',
              }
            }}
          />
        </Grid>
      </Grid>

      {/* Button Actions */}
      <Box sx={formActionContainerStyles}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          startIcon={isRtl ? <ArrowForward /> : <ArrowBack />}
          size="large"
        >
          {t('buttons.back')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={isRtl ? <ArrowBack /> : <ArrowForward />}
          size="large"
        >
          {t('buttons.submit')}
        </Button>
      </Box>
    </form>
  );
};
export default StepSituation;
