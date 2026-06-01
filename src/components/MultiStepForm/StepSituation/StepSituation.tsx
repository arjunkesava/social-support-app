import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../../context/FormContext.shared';
import type { SituationDescriptions } from '../../../context/FormContext.shared';
import { formFieldGridStyles, formActionContainerStyles } from '../styles';
import { getWritingSuggestion, type SituationField } from '../../../services/writingSuggestions';
import AiGeneratedSuggestion from './AiGeneratedSuggestion';

const helpButtonContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 1,
};

const situationFieldLabelKeys: Record<SituationField, string> = {
  financialSituation: 'situation.financial_situation',
  employmentCircumstances: 'situation.employment_circumstances',
  reasonForApplying: 'situation.reason_for_applying',
};

export const StepSituation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const [activeSuggestionField, setActiveSuggestionField] = useState<SituationField | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionError, setSuggestionError] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isEditingSuggestion, setIsEditingSuggestion] = useState(false);
  
  const isRtl = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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

  const handleHelpMeWrite = async (field: SituationField) => {
    setActiveSuggestionField(field);
    setSuggestion('');
    setSuggestionError('');
    setIsEditingSuggestion(false);
    setIsSuggestionLoading(true);

    try {
      const nextSuggestion = await getWritingSuggestion({
        field,
        fieldLabel: t(situationFieldLabelKeys[field]),
        existingText: getValues(field),
        personal: formData.personal,
        family: formData.family,
      });

      setSuggestion(nextSuggestion);
    } catch (error) {
      const isTimeout = typeof error === 'object' && error !== null && 'code' in error && error.code === 'ECONNABORTED';

      setSuggestionError(
        isTimeout
          ? t('situation.ai_suggestion.timeout_error')
          : t('situation.ai_suggestion.generic_error')
      );
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (!activeSuggestionField) {
      return;
    }

    setValue(activeSuggestionField, suggestion, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    updateStepData('situation', {
      ...getValues(),
      [activeSuggestionField]: suggestion,
    });
    handleCloseSuggestion();
  };

  const handleEditSuggestion = () => {
    setIsEditingSuggestion(true);
  };

  const handleCloseSuggestion = () => {
    setActiveSuggestionField(null);
    setSuggestion('');
    setSuggestionError('');
    setIsEditingSuggestion(false);
    setIsSuggestionLoading(false);
  };

  const renderHelpMeWriteButton = (field: SituationField) => (
    <Box sx={helpButtonContainerStyles}>
      <Button
        type="button"
        variant="text"
        size="small"
        onClick={() => handleHelpMeWrite(field)}
        disabled={isSuggestionLoading}
      >
        {t('situation.ai_suggestion.help_button')}
      </Button>
    </Box>
  );

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
          {renderHelpMeWriteButton('financialSituation')}
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
          {renderHelpMeWriteButton('employmentCircumstances')}
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
          {renderHelpMeWriteButton('reasonForApplying')}
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

      <AiGeneratedSuggestion
        open={activeSuggestionField !== null}
        suggestion={suggestion}
        suggestionError={suggestionError}
        isLoading={isSuggestionLoading}
        isEditing={isEditingSuggestion}
        onAccept={handleAcceptSuggestion}
        onClose={handleCloseSuggestion}
        onEdit={handleEditSuggestion}
        onSuggestionChange={setSuggestion}
      />
    </form>
  );
};
export default StepSituation;
