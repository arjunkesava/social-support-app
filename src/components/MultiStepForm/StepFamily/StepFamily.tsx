import React from "react";
import { Controller } from "react-hook-form";
import Box from "@mui/material/Box";
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
import { useTranslation } from "react-i18next";
import { useStepFamily } from "./useStepFamily";
import { currencyOptions } from "./types";
import { formFieldGridStyles, formActionContainerStyles } from "../styles";

export const StepFamily: React.FC = () => {
  const { t } = useTranslation();
  const { isRtl, control, errors, handleSubmit, onSubmit, handleBack } =
    useStepFamily();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3} sx={formFieldGridStyles}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="maritalStatus"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl required fullWidth error={!!errors.maritalStatus}>
                <InputLabel id="financial-marital-status-label">
                  {t("financial.marital_status")}
                </InputLabel>
                <Select
                  {...field}
                  labelId="financial-marital-status-label"
                  id="financial-marital-status"
                  label={t("financial.marital_status")}
                  inputProps={{
                    "aria-required": "true",
                    "aria-invalid": errors.maritalStatus ? "true" : "false",
                  }}
                >
                  <MenuItem value="single">
                    {t("financial.marital_options.single")}
                  </MenuItem>
                  <MenuItem value="married">
                    {t("financial.marital_options.married")}
                  </MenuItem>
                  <MenuItem value="divorced">
                    {t("financial.marital_options.divorced")}
                  </MenuItem>
                  <MenuItem value="widowed">
                    {t("financial.marital_options.widowed")}
                  </MenuItem>
                </Select>
                <FormHelperText>{errors.maritalStatus?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="dependents"
            control={control}
            rules={{
              required: t("validation.required"),
              min: {
                value: 0,
                message: t("validation.min_dependents"),
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                required
                id="financial-dependents"
                label={t("financial.dependents")}
                type="number"
                fullWidth
                variant="outlined"
                error={!!errors.dependents}
                helperText={errors.dependents?.message}
                slotProps={{
                  htmlInput: {
                    "aria-required": "true",
                    "aria-invalid": errors.dependents ? "true" : "false",
                    min: 0,
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="employmentStatus"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl required fullWidth error={!!errors.employmentStatus}>
                <InputLabel id="financial-employment-status-label">
                  {t("financial.employment_status")}
                </InputLabel>
                <Select
                  {...field}
                  labelId="financial-employment-status-label"
                  id="financial-employment-status"
                  label={t("financial.employment_status")}
                  inputProps={{
                    "aria-required": "true",
                    "aria-invalid": errors.employmentStatus ? "true" : "false",
                  }}
                >
                  <MenuItem value="employed">
                    {t("financial.employment_options.employed")}
                  </MenuItem>
                  <MenuItem value="unemployed">
                    {t("financial.employment_options.unemployed")}
                  </MenuItem>
                  <MenuItem value="student">
                    {t("financial.employment_options.student")}
                  </MenuItem>
                  <MenuItem value="retired">
                    {t("financial.employment_options.retired")}
                  </MenuItem>
                  <MenuItem value="self_employed">
                    {t("financial.employment_options.self_employed")}
                  </MenuItem>
                </Select>
                <FormHelperText>
                  {errors.employmentStatus?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="housingStatus"
            control={control}
            rules={{ required: t("validation.required") }}
            render={({ field }) => (
              <FormControl required fullWidth error={!!errors.housingStatus}>
                <InputLabel id="financial-housing-status-label">
                  {t("financial.housing_status")}
                </InputLabel>
                <Select
                  {...field}
                  labelId="financial-housing-status-label"
                  id="financial-housing-status"
                  label={t("financial.housing_status")}
                  inputProps={{
                    "aria-required": "true",
                    "aria-invalid": errors.housingStatus ? "true" : "false",
                  }}
                >
                  <MenuItem value="own">
                    {t("financial.housing_options.own")}
                  </MenuItem>
                  <MenuItem value="rent">
                    {t("financial.housing_options.rent")}
                  </MenuItem>
                  <MenuItem value="homeless">
                    {t("financial.housing_options.homeless")}
                  </MenuItem>
                  <MenuItem value="family">
                    {t("financial.housing_options.family")}
                  </MenuItem>
                </Select>
                <FormHelperText>{errors.housingStatus?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="monthlyIncome"
                control={control}
                rules={{
                  required: t("validation.required"),
                  min: {
                    value: 0,
                    message: t("validation.min_income"),
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    required
                    id="financial-monthly-income"
                    label={t("financial.monthly_income")}
                    type="number"
                    fullWidth
                    variant="outlined"
                    error={!!errors.monthlyIncome}
                    helperText={errors.monthlyIncome?.message}
                    slotProps={{
                      htmlInput: {
                        "aria-required": "true",
                        "aria-invalid": errors.monthlyIncome ? "true" : "false",
                        min: 0,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="currency"
                control={control}
                rules={{ required: t("validation.required") }}
                render={({ field }) => (
                  <FormControl required fullWidth error={!!errors.currency}>
                    <InputLabel id="financial-currency-label">
                      {t("financial.currency")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="financial-currency-label"
                      id="financial-currency"
                      label={t("financial.currency")}
                      inputProps={{
                        "aria-required": "true",
                        "aria-invalid": errors.currency ? "true" : "false",
                      }}
                    >
                      {currencyOptions.map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {t(`financial.currency_options.${currency}`)}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.currency?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={formActionContainerStyles}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          startIcon={isRtl ? <ArrowForward /> : <ArrowBack />}
          size="large"
        >
          {t("buttons.back")}
        </Button>
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
  );
};
export default StepFamily;
