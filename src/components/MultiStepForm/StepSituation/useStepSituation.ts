import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../../context/FormContext.shared";
import type { SituationDescriptions } from "../../../context/FormContext.shared";
import {
  ApplicationSubmissionError,
  submitApplication,
} from "../../../services/applicationSubmission";
import {
  getWritingSuggestion,
  WritingSuggestionError,
  type SituationField,
} from "../../../services/writingSuggestions";
import { useWritingSuggestionRateLimit } from "../../../hooks/useWritingSuggestionRateLimit";
import {
  formatRetryAfterMinutes,
  formatRetryAfterSeconds,
} from "../../../utils/writingSuggestionRateLimit";
import { situationFieldLabelKeys } from "./types";

export const useStepSituation = () => {
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
  const [rateLimitMessage, setRateLimitMessage] = useState("");
  const [rateLimitedField, setRateLimitedField] =
    useState<SituationField | null>(null);
  const [piiConsentGiven, setPiiConsentGiven] = useState<boolean | null>(null);

  const { limitStatus, tryConsumeRequest } = useWritingSuggestionRateLimit();

  const isRtl = i18n.language === "ar";

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

  const getRateLimitMessage = (
    reason: "COOLDOWN" | "QUOTA",
    retryAfterMs: number,
  ) => {
    if (reason === "COOLDOWN") {
      return t("situation.ai_suggestion.rate_limit_cooldown", {
        seconds: formatRetryAfterSeconds(retryAfterMs),
      });
    }

    return t("situation.ai_suggestion.rate_limit_quota", {
      minutes: formatRetryAfterMinutes(retryAfterMs),
    });
  };

  const isHelpMeWriteBlocked = !limitStatus.allowed || piiConsentGiven !== true;

  const handleHelpMeWrite = async (field: SituationField) => {
    setRateLimitMessage("");
    setRateLimitedField(null);

    const rateLimitCheck = tryConsumeRequest();
    if (!rateLimitCheck.allowed) {
      setRateLimitedField(field);
      setRateLimitMessage(
        getRateLimitMessage(rateLimitCheck.reason, rateLimitCheck.retryAfterMs),
      );
      return;
    }

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
      if (error instanceof WritingSuggestionError) {
        if (error.code === "TIMEOUT") {
          setSuggestionError(t("situation.ai_suggestion.timeout_error"));
          return;
        }

        if (
          error.code === "RATE_LIMIT_COOLDOWN" &&
          error.retryAfterMs !== undefined
        ) {
          setSuggestionError(
            getRateLimitMessage("COOLDOWN", error.retryAfterMs),
          );
          return;
        }

        if (
          error.code === "RATE_LIMIT_QUOTA" &&
          error.retryAfterMs !== undefined
        ) {
          setSuggestionError(getRateLimitMessage("QUOTA", error.retryAfterMs));
          return;
        }

        setSuggestionError(
          error.message || t("situation.ai_suggestion.generic_error"),
        );
        return;
      }

      setSuggestionError(t("situation.ai_suggestion.generic_error"));
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

  return {
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
  };
};
