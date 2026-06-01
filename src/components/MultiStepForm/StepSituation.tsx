import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';
import type { SituationDescriptions } from '../../context/FormContext';
import { formFieldGridStyles, formActionContainerStyles, suggestionProgressSpinnerStyles, suggestionStyles } from './styles';
import { getWritingSuggestion, type SituationField } from '../../services/writingSuggestions';

const helpButtonContainerStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 1,
};

const situationFieldLabels: Record<SituationField, string> = {
  financialSituation: 'Current Financial Situation',
  employmentCircumstances: 'Employment Circumstances',
  reasonForApplying: 'Reason for Applying',
};

export const StepSituation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const [activeSuggestionField, setActiveSuggestionField] = useState<SituationField | null>(null);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionError, setSuggestionError] = useState('');
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isEditingSuggestion, setIsEditingSuggestion] = useState(false);
  const suggestionInputRef = useRef<HTMLInputElement | null>(null);
  
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
        fieldLabel: situationFieldLabels[field],
        existingText: getValues(field),
        personal: formData.personal,
        family: formData.family,
      });

      setSuggestion(nextSuggestion);
    } catch (error) {
      const isTimeout = typeof error === 'object' && error !== null && 'code' in error && error.code === 'ECONNABORTED';

      setSuggestionError(
        isTimeout
          ? 'The writing suggestion took too long. Please try again.'
          : 'We could not generate a suggestion right now. Please try again in a moment.'
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
    window.setTimeout(() => suggestionInputRef.current?.focus(), 0);
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
        Help me write
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

      <Dialog
        open={activeSuggestionField !== null}
        onClose={isSuggestionLoading ? undefined : handleCloseSuggestion}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Help me write</DialogTitle>
        <DialogContent>
          {isSuggestionLoading ? (
            <Box sx={suggestionProgressSpinnerStyles}>
              <CircularProgress aria-label="Generating writing suggestion" />
              <Box>Generating a suggestion...</Box>
            </Box>
          ) : (
            <Box sx={suggestionStyles}>
              {suggestionError ? <Alert severity="error">{suggestionError}</Alert> : null}
              {suggestion ? (
                <TextField
                  inputRef={suggestionInputRef}
                  label="Suggested text"
                  value={suggestion}
                  onChange={(event) => setSuggestion(event.target.value)}
                  multiline
                  rows={6}
                  fullWidth
                  disabled={!isEditingSuggestion}
                  slotProps={{
                    htmlInput: {
                      'aria-label': 'Suggested text',
                    },
                  }}
                />
              ) : null}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleCloseSuggestion} disabled={isSuggestionLoading}>
            Discard
          </Button>
          <Button type="button" onClick={handleEditSuggestion} disabled={isSuggestionLoading || !suggestion}>
            Edit
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={handleAcceptSuggestion}
            disabled={isSuggestionLoading || !suggestion}
          >
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};
export default StepSituation;
