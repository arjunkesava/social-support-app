import React from "react";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import { useStepSituation } from "./useStepSituation";
import {
  situationFields,
  situationFieldIds,
  situationFieldLabelKeys,
  situationPlaceholderKeys,
  type SituationField,
} from "./types";
import AiGeneratedSuggestion from "./AiGeneratedSuggestion";
import { PiiConsent } from "../../PiiConsent/PiiConsent";
import { formFieldGridStyles, formActionContainerStyles } from "../styles";
import { formatRetryAfterSeconds } from "../../../utils/writingSuggestionRateLimit";

const helpButtonContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  mt: 1,
};

export const StepSituation: React.FC = () => {
  const { t } = useTranslation();
  const {
    isRtl,
    control,
    errors,
    isSubmitting,
    submitError,
    suggestion,
    suggestionError,
    isSuggestionLoading,
    isEditingSuggestion,
    activeSuggestionField,
    rateLimitMessage,
    rateLimitedField,
    limitStatus,
    isHelpMeWriteBlocked,
    piiConsentGiven,
    situationFieldRules,
    handleSubmit,
    onSubmit,
    handleBack,
    handleHelpMeWrite,
    handleAcceptSuggestion,
    handleEditSuggestion,
    handleCloseSuggestion,
    setSuggestion,
    setPiiConsentGiven,
  } = useStepSituation();

  const renderHelpMeWriteButton = (field: SituationField) => {
    const showCooldownLabel =
      !limitStatus.allowed && limitStatus.reason === "COOLDOWN";

    return (
      <Box sx={helpButtonContainerStyles}>
        <Button
          type="button"
          variant="text"
          size="small"
          onClick={(e) => handleHelpMeWrite(field, e.currentTarget)}
          disabled={isSuggestionLoading || isHelpMeWriteBlocked}
        >
          {showCooldownLabel
            ? t("situation.ai_suggestion.rate_limit_cooldown_button", {
                seconds: formatRetryAfterSeconds(limitStatus.retryAfterMs),
              })
            : t("situation.ai_suggestion.help_button")}
        </Button>
        {rateLimitedField === field && rateLimitMessage ? (
          <Typography
            component="p"
            variant="caption"
            color="error"
            role="alert"
            sx={{ mt: 0.5, textAlign: "end" }}
          >
            {rateLimitMessage}
          </Typography>
        ) : null}
      </Box>
    );
  };

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
      <PiiConsent
        consentGiven={piiConsentGiven}
        onConsent={() => setPiiConsentGiven(true)}
        onDecline={() => setPiiConsentGiven(false)}
      />

      <Grid container spacing={3} sx={formFieldGridStyles}>
        {situationFields.map(renderSituationTextField)}
      </Grid>

      {submitError ? (
        <Alert severity="error" sx={{ mt: 3 }}>
          {submitError}
        </Alert>
      ) : null}

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
