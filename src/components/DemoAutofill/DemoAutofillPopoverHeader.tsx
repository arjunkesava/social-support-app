import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import {
  getPopoverHeaderStyles,
  popoverHeaderTitleRowStyles,
  popoverTitleStyles,
} from "./styles";
import type { DemoAutofillPopoverHeaderProps } from "./types";

export const DemoAutofillPopoverHeader: React.FC<
  DemoAutofillPopoverHeaderProps
> = ({ themeMode, onClose }) => {
  const { t } = useTranslation();

  return (
    <Box sx={getPopoverHeaderStyles(themeMode)}>
      <Box sx={popoverHeaderTitleRowStyles}>
        <AutoFixHighIcon fontSize="small" color="primary" />
        <Typography variant="subtitle1" sx={popoverTitleStyles}>
          {t("demo_autofill.title")}
        </Typography>
      </Box>

      <IconButton
        size="small"
        onClick={onClose}
        aria-label={t("demo_autofill.close")}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DemoAutofillPopoverHeader;
