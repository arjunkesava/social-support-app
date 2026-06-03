import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import RestartAlt from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  successContainerStyles,
  successIconStyles,
  summarySectionCardStyles,
} from "../styles";
import { useStepSuccess } from "./useStepSuccess";

export const StepSuccess: React.FC = () => {
  const { t } = useTranslation();
  const {
    formData,
    monthlyIncome,
    translateOption,
    renderDetailItem,
    handleReset,
  } = useStepSuccess();

  return (
    <Box sx={successContainerStyles}>
      <CheckCircleOutlined sx={successIconStyles} aria-hidden="true" />

      <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
        {t("success.title")}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: "600px", marginBottom: "2rem" }}
      >
        {t("success.subtitle")}
      </Typography>

      {/* Summary Accordion/Card Lists */}

      {/* 1. Personal Information */}
      <Box
        sx={summarySectionCardStyles}
        component="section"
        aria-labelledby="personal-review-title"
      >
        <Typography
          variant="h6"
          id="personal-review-title"
          color="primary"
          sx={{ fontWeight: 700, marginBottom: "1.5rem" }}
        >
          {t("success.section_personal")}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.name"), formData.personal.name)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(
              t("personal.national_id"),
              formData.personal.nationalId,
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.dob"), formData.personal.dob)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(
              t("personal.gender"),
              translateOption(
                `personal.gender_options.${formData.personal.gender}`,
                formData.personal.gender,
              ),
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.phone"), formData.personal.phone)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.email"), formData.personal.email)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {renderDetailItem(t("personal.address"), formData.personal.address)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.city"), formData.personal.city)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.state"), formData.personal.state)}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("personal.country"), formData.personal.country)}
          </Grid>
        </Grid>
      </Box>

      {/* 2. Family & Financial Info */}
      <Box
        sx={summarySectionCardStyles}
        component="section"
        aria-labelledby="financial-review-title"
      >
        <Typography
          variant="h6"
          id="financial-review-title"
          color="primary"
          sx={{ fontWeight: 700, marginBottom: "1.5rem" }}
        >
          {t("success.section_financial")}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(
              t("financial.marital_status"),
              translateOption(
                `financial.marital_options.${formData.family.maritalStatus}`,
                formData.family.maritalStatus,
              ),
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(
              t("financial.dependents"),
              formData.family.dependents,
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(
              t("financial.employment_status"),
              translateOption(
                `financial.employment_options.${formData.family.employmentStatus}`,
                formData.family.employmentStatus,
              ),
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            {renderDetailItem(t("financial.monthly_income"), monthlyIncome)}
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            {renderDetailItem(
              t("financial.housing_status"),
              translateOption(
                `financial.housing_options.${formData.family.housingStatus}`,
                formData.family.housingStatus,
              ),
            )}
          </Grid>
        </Grid>
      </Box>

      {/* 3. Situation Descriptions */}
      <Box
        sx={summarySectionCardStyles}
        component="section"
        aria-labelledby="situation-review-title"
      >
        <Typography
          variant="h6"
          id="situation-review-title"
          color="primary"
          sx={{ fontWeight: 700, marginBottom: "1.5rem" }}
        >
          {t("success.section_situation")}
        </Typography>
        <Divider sx={{ marginBottom: "1.5rem" }} />
        {renderDetailItem(
          t("situation.financial_situation"),
          formData.situation.financialSituation,
        )}
        <Divider sx={{ marginY: "1.5rem" }} />
        {renderDetailItem(
          t("situation.employment_circumstances"),
          formData.situation.employmentCircumstances,
        )}
        <Divider sx={{ marginY: "1.5rem" }} />
        {renderDetailItem(
          t("situation.reason_for_applying"),
          formData.situation.reasonForApplying,
        )}
      </Box>

      {/* Reset button to clear all and start a new application */}
      <Box sx={{ marginTop: "3rem" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReset}
          startIcon={<RestartAlt />}
          size="large"
        >
          {t("buttons.reset")}
        </Button>
      </Box>
    </Box>
  );
};
export default StepSuccess;
