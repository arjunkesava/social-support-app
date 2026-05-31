import React from 'react';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';
import type { FamilyFinancialInfo } from '../../context/FormContext';
import { formFieldGridStyles, formActionContainerStyles } from './styles';

export const StepFamily: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  
  const isRtl = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FamilyFinancialInfo>({
    defaultValues: formData.family,
    mode: 'onTouched',
  });

  const onSubmit = (data: FamilyFinancialInfo) => {
    updateStepData('family', data);
    setActiveStep(2);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3} sx={formFieldGridStyles}>
        {/* Marital Status */}
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            required
            select
            id="financial-marital-status"
            label={t('financial.marital_status')}
            fullWidth
            variant="outlined"
            defaultValue={formData.family.maritalStatus}
            {...register('maritalStatus', {
              required: t('validation.required'),
            })}
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.maritalStatus ? 'true' : 'false',
              }
            }}
          >
            <MenuItem value="single">{t('financial.marital_options.single')}</MenuItem>
            <MenuItem value="married">{t('financial.marital_options.married')}</MenuItem>
            <MenuItem value="divorced">{t('financial.marital_options.divorced')}</MenuItem>
            <MenuItem value="widowed">{t('financial.marital_options.widowed')}</MenuItem>
          </TextField>
        </Grid>

        {/* Dependents */}
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            required
            id="financial-dependents"
            label={t('financial.dependents')}
            type="number"
            fullWidth
            variant="outlined"
            {...register('dependents', {
              required: t('validation.required'),
              min: {
                value: 0,
                message: t('validation.min_dependents'),
              },
              valueAsNumber: true,
            })}
            error={!!errors.dependents}
            helperText={errors.dependents?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.dependents ? 'true' : 'false',
                min: 0,
              }
            }}
          />
        </Grid>

        {/* Employment Status */}
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            required
            select
            id="financial-employment-status"
            label={t('financial.employment_status')}
            fullWidth
            variant="outlined"
            defaultValue={formData.family.employmentStatus}
            {...register('employmentStatus', {
              required: t('validation.required'),
            })}
            error={!!errors.employmentStatus}
            helperText={errors.employmentStatus?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.employmentStatus ? 'true' : 'false',
              }
            }}
          >
            <MenuItem value="employed">{t('financial.employment_options.employed')}</MenuItem>
            <MenuItem value="unemployed">{t('financial.employment_options.unemployed')}</MenuItem>
            <MenuItem value="student">{t('financial.employment_options.student')}</MenuItem>
            <MenuItem value="retired">{t('financial.employment_options.retired')}</MenuItem>
            <MenuItem value="self_employed">{t('financial.employment_options.self_employed')}</MenuItem>
          </TextField>
        </Grid>

        {/* Monthly Income */}
        <Grid size={{xs: 12, sm: 6}}>
          <TextField
            required
            id="financial-monthly-income"
            label={t('financial.monthly_income')}
            type="number"
            fullWidth
            variant="outlined"
            {...register('monthlyIncome', {
              required: t('validation.required'),
              min: {
                value: 0,
                message: t('validation.min_income'),
              },
              valueAsNumber: true,
            })}
            error={!!errors.monthlyIncome}
            helperText={errors.monthlyIncome?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.monthlyIncome ? 'true' : 'false',
                min: 0,
              }
            }}
          />
        </Grid>

        {/* Housing Status */}
        <Grid size={{xs: 12}}>
          <TextField
            required
            select
            id="financial-housing-status"
            label={t('financial.housing_status')}
            fullWidth
            variant="outlined"
            defaultValue={formData.family.housingStatus}
            {...register('housingStatus', {
              required: t('validation.required'),
            })}
            error={!!errors.housingStatus}
            helperText={errors.housingStatus?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.housingStatus ? 'true' : 'false',
              }
            }}
          >
            <MenuItem value="own">{t('financial.housing_options.own')}</MenuItem>
            <MenuItem value="rent">{t('financial.housing_options.rent')}</MenuItem>
            <MenuItem value="homeless">{t('financial.housing_options.homeless')}</MenuItem>
            <MenuItem value="family">{t('financial.housing_options.family')}</MenuItem>
          </TextField>
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
          {t('buttons.next')}
        </Button>
      </Box>
    </form>
  );
};
export default StepFamily;
