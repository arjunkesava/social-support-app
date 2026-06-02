import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import type { DemoAutofillSnackbarProps } from "./types";
import { snackbarAlertStyles } from "./styles";

export const DemoAutofillSnackbar: React.FC<DemoAutofillSnackbarProps> = ({
  open,
  selectedUserName,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={snackbarAlertStyles}
      >
        {t("demo_autofill.snackbar_success", {
          name: open ? selectedUserName : "",
        })}
      </Alert>
    </Snackbar>
  );
};

export default DemoAutofillSnackbar;
