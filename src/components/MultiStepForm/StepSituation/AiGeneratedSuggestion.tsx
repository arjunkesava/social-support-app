import React, { useRef } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { suggestionProgressSpinnerStyles, suggestionStyles } from "../styles";
import type { AiGeneratedSuggestionProps } from "./AiGeneratedSuggestion/types";

export const AiGeneratedSuggestion: React.FC<AiGeneratedSuggestionProps> = ({
  open,
  suggestion,
  suggestionError,
  isLoading,
  isEditing,
  onAccept,
  onClose,
  onEdit,
  onSuggestionChange,
}) => {
  const { t } = useTranslation();
  const suggestionInputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    onEdit();
    window.setTimeout(() => suggestionInputRef.current?.focus(), 0);
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t("situation.ai_suggestion.title")}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box sx={suggestionProgressSpinnerStyles}>
            <CircularProgress
              aria-label={t("situation.ai_suggestion.loading_aria")}
            />
            <Box>{t("situation.ai_suggestion.loading")}</Box>
          </Box>
        ) : (
          <Box sx={suggestionStyles}>
            {suggestionError ? (
              <Alert severity="error">{suggestionError}</Alert>
            ) : null}
            {suggestion ? (
              <TextField
                inputRef={suggestionInputRef}
                label={t("situation.ai_suggestion.suggested_text")}
                value={suggestion}
                onChange={(event) => onSuggestionChange(event.target.value)}
                multiline
                rows={6}
                fullWidth
                slotProps={{
                  htmlInput: {
                    "aria-label": t("situation.ai_suggestion.suggested_text"),
                    style: { resize: "vertical" },
                  },
                  input: {
                    readOnly: !isEditing,
                  },
                }}
              />
            ) : null}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button type="button" onClick={onClose} disabled={isLoading}>
          {t("situation.ai_suggestion.discard")}
        </Button>
        <Button
          type="button"
          onClick={handleEdit}
          disabled={isLoading || !suggestion}
        >
          {t("situation.ai_suggestion.edit")}
        </Button>
        <Button
          type="button"
          variant="contained"
          onClick={onAccept}
          disabled={isLoading || !suggestion}
        >
          {t("situation.ai_suggestion.accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AiGeneratedSuggestion;
