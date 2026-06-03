import type { SxProps, Theme } from "@mui/material";

export const piiConsentContainerStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: { xs: "flex-start", sm: "center" },
  justifyContent: "space-between",
  gap: 2,
  p: 2,
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? "rgba(170, 59, 255, 0.06)"
      : "rgba(170, 59, 255, 0.1)",
  border: (theme) =>
    theme.palette.mode === "light"
      ? "1px solid rgba(170, 59, 255, 0.15)"
      : "1px solid rgba(170, 59, 255, 0.2)",
  mb: 3,
};

export const piiConsentTextStyles: SxProps<Theme> = {
  color: "text.secondary",
  flex: 1,
};

export const piiConsentActionsStyles: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  flexShrink: 0,
};

export const piiConsentDeclinedStyles: SxProps<Theme> = {
  p: 2,
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? "rgba(239, 68, 68, 0.06)"
      : "rgba(239, 68, 68, 0.1)",
  border: (theme) =>
    theme.palette.mode === "light"
      ? "1px solid rgba(239, 68, 68, 0.15)"
      : "1px solid rgba(239, 68, 68, 0.2)",
  mb: 3,
};
