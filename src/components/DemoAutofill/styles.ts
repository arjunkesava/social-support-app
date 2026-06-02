import type { SxProps, Theme } from "@mui/material";
import type { ThemeMode } from "../../context/FormContext.shared";

export const fabStyles: SxProps<Theme> = {
  position: "fixed",
  bottom: 24,
  insetInlineEnd: 24,
  zIndex: 1300,
  boxShadow: "0 8px 32px rgba(170, 59, 255, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "scale(1.1) rotate(15deg)",
  },
};

export const getPopoverPaperStyles = (
  themeMode: ThemeMode,
): SxProps<Theme> => ({
  width: { xs: "320px", sm: "380px" },
  maxHeight: "480px",
  borderRadius: "20px",
  padding: 0,
  boxShadow:
    themeMode === "light"
      ? "0 20px 40px rgba(0,0,0,0.1)"
      : "0 20px 40px rgba(0,0,0,0.5)",
  backgroundColor:
    themeMode === "light"
      ? "rgba(255, 255, 255, 0.85)"
      : "rgba(20, 20, 28, 0.85)",
  backdropFilter: "blur(20px)",
  border:
    themeMode === "light"
      ? "1px solid rgba(0, 0, 0, 0.08)"
      : "1px solid rgba(255, 255, 255, 0.08)",
  overflowY: "auto",
});

export const getPopoverHeaderStyles = (
  themeMode: ThemeMode,
): SxProps<Theme> => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "inherit",
  p: 2,
  pb: 1,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom:
    themeMode === "light"
      ? "1px solid rgba(0, 0, 0, 0.05)"
      : "1px solid rgba(255, 255, 255, 0.05)",
});

export const popoverHeaderTitleRowStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const popoverTitleStyles: SxProps<Theme> = {
  fontWeight: 750,
  color: "text.primary",
};

export const popoverContentStyles: SxProps<Theme> = {
  p: 2,
};

export const popoverDescriptionStyles: SxProps<Theme> = {
  mb: 2,
  fontSize: "0.85rem",
};

export const userListStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
};

export const userCardContentStyles: SxProps<Theme> = {
  p: "12px !important",
};

export const userCardHeaderRowStyles: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1,
};

export const userNameStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: "text.primary",
};

export const countryChipStyles: SxProps<Theme> = {
  fontSize: "0.7rem",
  height: "18px",
  px: "2px",
  fontWeight: 600,
};

export const userDescriptionStyles: SxProps<Theme> = {
  display: "block",
  mb: 1,
  lineHeight: 1.3,
};

export const userStatsDividerStyles: SxProps<Theme> = {
  my: 1,
  opacity: 0.5,
};

export const userStatsRowStyles: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
};

export const userStatItemStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
};

export const userStatIconStyles: SxProps<Theme> = {
  fontSize: "0.9rem",
  color: "text.secondary",
};

export const capitalizeStatTextStyles: SxProps<Theme> = {
  textTransform: "capitalize",
  fontWeight: 500,
};

export const dependentsStatTextStyles: SxProps<Theme> = {
  fontWeight: 500,
};

export const incomeStatTextStyles: SxProps<Theme> = {
  fontWeight: 600,
  color: "primary.main",
};

export const snackbarAlertStyles: SxProps<Theme> = {
  width: "100%",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  fontWeight: 600,
};
