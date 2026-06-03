import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../../context/FormContext.shared";
import type { SituationDescriptions } from "../../../context/FormContext.shared";
import { formFieldGridStyles, formActionContainerStyles } from "../styles";
import {
  ApplicationSubmissionError,
  submitApplication,
} from "../../../services/applicationSubmission";
import {
  getWritingSuggestion,
  type SituationField,
} from "../../../services/writingSuggestions";
import AiGeneratedSuggestion from "./AiGeneratedSuggestion";

const helpButtonContainerStyles = {
  display: "flex",
  justifyContent: "flex-end",
  mt: 1,
};

const situationFieldLabelKeys: Record<SituationField, string> = {
  financialSituation: "situation.financial_situation",
  employmentCircumstances: "situation.employment_circumstances",
  reasonForApplying: "situation.reason_for_applying",
};

export const StepSituation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const navigate = useNavigate();
  const [activeSuggestionField, setActiveSuggestionField] =
    useState<SituationField | null>(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionError, setSuggestionError] = useState("");
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isEditingSuggestion, setIsEditingSuggestion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isRtl = i18n.language === "ar";

  const situationFields: SituationField[] = [
    "financialSituation",
    "employmentCircumstances",
    "reasonForApplying",
  ];

  const situationFieldIds: Record<SituationField, string> = {
    financialSituation: "situation-financial",
    employmentCircumstances: "situation-employment",
    reasonForApplying: "situation-reason",
  };

  const situationPlaceholderKeys: Record<SituationField, string> = {
    financialSituation: "situation.financial_situation_placeholder",
    employmentCircumstances: "situation.employment_circumstances_placeholder",
    reasonForApplying: "situation.reason_for_applying_placeholder",
  };

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SituationDescriptions>({
    defaultValues: formData.situation,
    mode: "onTouched",
  });

  const onSubmit = async (data: SituationDescriptions) => {
    setSubmitError("");
    updateStepData("situation", data);
    setIsSubmitting(true);

    try {
      await submitApplication({ ...formData, situation: data });
      setActiveStep(3);
      navigate("/success");
    } catch (error) {
      if (
        error instanceof ApplicationSubmissionError &&
        error.code === "TIMEOUT"
      ) {
        setSubmitError(t("situation.submission.timeout_error"));
        return;
      }

      setSubmitError(t("situation.submission.generic_error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/family");
  };

  const handleHelpMeWrite = async (field: SituationField) => {
    setActiveSuggestionField(field);
    setSuggestion("");
    setSuggestionError("");
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
      const isTimeout =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ECONNABORTED";

      setSuggestionError(
        isTimeout
          ? t("situation.ai_suggestion.timeout_error")
          : t("situation.ai_suggestion.generic_error"),
      );
    } finally {
      setIsSuggestionLoading(false);
    }
  };

  const handleAcceptSuggestion = () => {
    if (!activeSuggestionField) {
      return;
    }

    setValue(activeSuggestionField, suggestion, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    updateStepData("situation", {
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
    setSuggestion("");
    setSuggestionError("");
    setIsEditingSuggestion(false);
    setIsSuggestionLoading(false);
  };

  const situationFieldRules = {
    required: t("validation.required"),
    minLength: {
      value: 15,
      message: t("validation.min_length"),
    },
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
        {t("situation.ai_suggestion.help_button")}
      </Button>
    </Box>
  );

  const renderSituationTextField = (field: SituationField) => (
    <Grid size={12} key={field}>
      <Controller
        name={field}
        control={control}
        rules={situationFieldRules}
        render={({ field: rhfField }) => (
          <TextField
            {...rhfField}
            required
            id={situationFieldIds[field]}
            label={t(situationFieldLabelKeys[field])}
            placeholder={t(situationPlaceholderKeys[field])}
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            error={!!errors[field]}
            helperText={errors[field]?.message}
            slotProps={{
              htmlInput: {
                "aria-required": "true",
                "aria-invalid": errors[field] ? "true" : "false",
                style: { resize: "vertical" },
              },
            }}
          />
        )}
      />
      {renderHelpMeWriteButton(field)}
    </Grid>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3} sx={formFieldGridStyles}>
        {situationFields.map(renderSituationTextField)}
      </Grid>

      {submitError ? (
        <Alert severity="error" sx={{ mt: 3 }}>
          {submitError}
        </Alert>
      ) : null}

      {/* Button Actions */}
      <Box sx={formActionContainerStyles}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          startIcon={isRtl ? <ArrowForward /> : <ArrowBack />}
          size="large"
          disabled={isSubmitting}
        >
          {t("buttons.back")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={
            isSubmitting ? (
              <CircularProgress size={20} color="inherit" aria-hidden />
            ) : isRtl ? (
              <ArrowBack />
            ) : (
              <ArrowForward />
            )
          }
          size="large"
          disabled={isSubmitting || isSuggestionLoading}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? t("situation.submission.submitting")
            : t("buttons.submit")}
        </Button>
      </Box>

      <Backdrop
        open={isSubmitting}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress
          color="inherit"
          aria-label={t("situation.submission.submitting_aria")}
        />
      </Backdrop>

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
