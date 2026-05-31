import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useFormContext } from '../../context/FormContext';
import type { PersonalInfo } from '../../context/FormContext';
import { formFieldGridStyles, formActionContainerStyles } from './styles';

export const StepPersonal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  
  const isRtl = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    defaultValues: formData.personal,
    mode: 'onTouched',
  });

  const onSubmit = (data: PersonalInfo) => {
    updateStepData('personal', data);
    setActiveStep(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3} sx={formFieldGridStyles}>
        {/* Name */}
        <Grid size={12}>
          <TextField
            required
            id="personal-name"
            label={t('personal.name')}
            fullWidth
            variant="outlined"
            {...register('name', { 
              required: t('validation.required') 
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.name ? 'true' : 'false'
              }
            }}
          />
        </Grid>

        {/* National ID */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            id="personal-national-id"
            label={t('personal.national_id')}
            fullWidth
            variant="outlined"
            {...register('nationalId', {
              required: t('validation.required'),
              pattern: {
                value: /^\d{10}$/,
                message: t('validation.national_id'),
              },
            })}
            error={!!errors.nationalId}
            helperText={errors.nationalId?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.nationalId ? 'true' : 'false',
                inputMode: 'numeric',
              }
            }}
          />
        </Grid>

        {/* Date of Birth */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            id="personal-dob"
            label={t('personal.dob')}
            type="date"
            fullWidth
            variant="outlined"
            {...register('dob', {
              required: t('validation.required'),
            })}
            error={!!errors.dob}
            helperText={errors.dob?.message}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.dob ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* Gender */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            select
            id="personal-gender"
            label={t('personal.gender')}
            fullWidth
            variant="outlined"
            defaultValue={formData.personal.gender}
            {...register('gender', {
              required: t('validation.required'),
            })}
            error={!!errors.gender}
            helperText={errors.gender?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.gender ? 'true' : 'false',
              }
            }}
          >
            <MenuItem value="male">{t('personal.gender_options.male')}</MenuItem>
            <MenuItem value="female">{t('personal.gender_options.female')}</MenuItem>
            <MenuItem value="other">{t('personal.gender_options.other')}</MenuItem>
          </TextField>
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            required
            id="personal-phone"
            label={t('personal.phone')}
            fullWidth
            variant="outlined"
            {...register('phone', {
              required: t('validation.required'),
              pattern: {
                value: /^\+?[\d\s-]{7,15}$/,
                message: t('validation.phone'),
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.phone ? 'true' : 'false',
                type: 'tel',
              }
            }}
          />
        </Grid>

        {/* Email */}
        <Grid size={12}>
          <TextField
            required
            id="personal-email"
            label={t('personal.email')}
            fullWidth
            variant="outlined"
            {...register('email', {
              required: t('validation.required'),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: t('validation.email'),
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.email ? 'true' : 'false',
                type: 'email',
              }
            }}
          />
        </Grid>

        {/* Address */}
        <Grid size={12}>
          <TextField
            required
            id="personal-address"
            label={t('personal.address')}
            fullWidth
            variant="outlined"
            {...register('address', {
              required: t('validation.required'),
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.address ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* City */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            required
            id="personal-city"
            label={t('personal.city')}
            fullWidth
            variant="outlined"
            {...register('city', {
              required: t('validation.required'),
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.city ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* State */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            required
            id="personal-state"
            label={t('personal.state')}
            fullWidth
            variant="outlined"
            {...register('state', {
              required: t('validation.required'),
            })}
            error={!!errors.state}
            helperText={errors.state?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.state ? 'true' : 'false',
              }
            }}
          />
        </Grid>

        {/* Country */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            required
            id="personal-country"
            label={t('personal.country')}
            fullWidth
            variant="outlined"
            {...register('country', {
              required: t('validation.required'),
            })}
            error={!!errors.country}
            helperText={errors.country?.message}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': errors.country ? 'true' : 'false',
              }
            }}
          />
        </Grid>
      </Grid>

      {/* Button Actions */}
      <Box sx={formActionContainerStyles}>
        <Button 
          disabled 
          variant="outlined"
          startIcon={isRtl ? <ArrowForward /> : <ArrowBack />}
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
export default StepPersonal;
