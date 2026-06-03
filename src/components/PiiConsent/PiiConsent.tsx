import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import {
  piiConsentContainerStyles,
  piiConsentTextStyles,
  piiConsentActionsStyles,
  piiConsentDeclinedStyles,
} from "./styles";

type PiiConsentProps = {
  consentGiven: boolean | null;
  onConsent: () => void;
  onDecline: () => void;
};

export const PiiConsent: React.FC<PiiConsentProps> = ({
  consentGiven,
  onConsent,
  onDecline,
}) => {
  const { t } = useTranslation();

  if (consentGiven === true) {
    return null;
  }

  if (consentGiven === false) {
    return (
      <Box sx={piiConsentDeclinedStyles} role="alert">
        <Typography variant="body2">
          {t("pii_consent.declined_message")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={piiConsentContainerStyles} role="region" aria-label="PII consent">
      <Typography variant="body2" sx={piiConsentTextStyles}>
        {t("pii_consent.notice")}
      </Typography>
      <Box sx={piiConsentActionsStyles}>
        <Button variant="contained" size="small" onClick={onConsent}>
          {t("pii_consent.accept")}
        </Button>
        <Button variant="outlined" size="small" onClick={onDecline}>
          {t("pii_consent.decline")}
        </Button>
      </Box>
    </Box>
  );
};

export default PiiConsent;
