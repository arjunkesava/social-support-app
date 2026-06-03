import React from "react";
import { Controller, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../../context/FormContext.shared";
import type { PersonalInfo } from "../../../context/FormContext.shared";
import { EMIRATES_ID_PATTERN } from "../../../utils/emiratesId";
import { formFieldGridStyles, formActionContainerStyles } from "../styles";

export const StepPersonal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    values: formData.personal,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: "onTouched",
  });

  const onSubmit = (data: PersonalInfo) => {
    updateStepData("personal", data);
    setActiveStep(1);
    navigate("/family");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3} sx={formFieldGridStyles}>
          {/* Name */}
          <Grid size={12}>
            <TextField
              required
              autoFocus
              id="personal-name"
              label={t("personal.name")}
              fullWidth
              variant="outlined"
              {...register("name", {
                required: t("validation.required"),
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.name ? "true" : "false",
                },
              }}
            />
          </Grid>

          {/* National ID */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="personal-national-id"
              label={t("personal.national_id")}
              fullWidth
              variant="outlined"
              placeholder={t("personal.national_id_placeholder")}
              {...register("nationalId", {
                required: t("validation.required"),
                pattern: {
                  value: EMIRATES_ID_PATTERN,
                  message: t("validation.national_id"),
                },
              })}
              error={!!errors.nationalId}
              helperText={errors.nationalId?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.nationalId ? "true" : "false",
                  autoComplete: "off",
                },
              }}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="dob"
              control={control}
              rules={{
                required: t("validation.required"),
              }}
              render={({ field }) => (
                <DatePicker
                  disableFuture
                  maxDate={dayjs()}
                  label={t("personal.dob")}
                  value={dayjs(field.value)}
                  onChange={(date) => {
                    field.onChange(date ? date.format("YYYY-MM-DD") : "");
                  }}
                  sx={{
                    "& .MuiPickersOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                      error: !!errors.dob,
                      helperText: errors.dob?.message,
                    },
                    field: {
                      "aria-required": true,
                      "aria-invalid": !!errors.dob,
                    },
                  }}
                />
              )}
            />
          </Grid>

          {/* Gender */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="gender"
              control={control}
              rules={{ required: t("validation.required") }}
              render={({ field }) => (
                <FormControl required fullWidth error={!!errors.gender}>
                  <InputLabel id="personal-gender-label">
                    {t("personal.gender")}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="personal-gender-label"
                    id="personal-gender"
                    label={t("personal.gender")}
                    inputProps={{
                      "aria-required": "true",
                      "aria-invalid": errors.gender ? "true" : "false",
                    }}
                  >
                    <MenuItem value="male">
                      {t("personal.gender_options.male")}
                    </MenuItem>
                    <MenuItem value="female">
                      {t("personal.gender_options.female")}
                    </MenuItem>
                    <MenuItem value="other">
                      {t("personal.gender_options.other")}
                    </MenuItem>
                  </Select>
                  <FormHelperText>{errors.gender?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              id="personal-phone"
              label={t("personal.phone")}
              fullWidth
              variant="outlined"
              {...register("phone", {
                required: t("validation.required"),
                pattern: {
                  value: /^\+?[\d\s-]{7,15}$/,
                  message: t("validation.phone"),
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.phone ? "true" : "false",
                  type: "tel",
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid size={12}>
            <TextField
              required
              id="personal-email"
              label={t("personal.email")}
              fullWidth
              variant="outlined"
              {...register("email", {
                required: t("validation.required"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t("validation.email"),
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.email ? "true" : "false",
                  type: "email",
                },
              }}
            />
          </Grid>

          {/* Address */}
          <Grid size={12}>
            <TextField
              required
              id="personal-address"
              label={t("personal.address")}
              fullWidth
              variant="outlined"
              multiline
              minRows={3}
              maxRows={10}
              {...register("address", {
                required: t("validation.required"),
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.address ? "true" : "false",
                  style: { resize: "vertical" },
                },
              }}
            />
          </Grid>

          {/* City */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              required
              id="personal-city"
              label={t("personal.city")}
              fullWidth
              variant="outlined"
              {...register("city", {
                required: t("validation.required"),
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.city ? "true" : "false",
                },
              }}
            />
          </Grid>

          {/* State */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              required
              id="personal-state"
              label={t("personal.state")}
              fullWidth
              variant="outlined"
              {...register("state", {
                required: t("validation.required"),
              })}
              error={!!errors.state}
              helperText={errors.state?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.state ? "true" : "false",
                },
              }}
            />
          </Grid>

          {/* Country */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              required
              id="personal-country"
              label={t("personal.country")}
              fullWidth
              variant="outlined"
              {...register("country", {
                required: t("validation.required"),
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
              slotProps={{
                htmlInput: {
                  "aria-required": "true",
                  "aria-invalid": errors.country ? "true" : "false",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Button Actions */}
        <Box sx={formActionContainerStyles}>
          <Box />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={isRtl ? <ArrowBack /> : <ArrowForward />}
            size="large"
          >
            {t("buttons.next")}
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  );
};
export default StepPersonal;
