import type { SxProps, Theme } from "@mui/material";

export const navbarContainerStyles: SxProps<Theme> = {
  width: "100%",
  maxWidth: "100%", // Stretch to full width
  margin: "0 auto 2.5rem auto",
  padding: { xs: "1rem", sm: "1.25rem 2rem" },
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  alignItems: "center",
  justifyContent: "space-between",
  gap: { xs: "1rem", sm: "2rem" },
  borderRadius: "20px",
  boxSizing: "border-box",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  // Sticky Positioning: Sticky on desktop (md and above), static on mobile/tablet (xs/sm)
  position: { xs: "static", md: "sticky" },
  top: { xs: "auto", md: "1.5rem" },
  zIndex: 1100,

  // Premium Glassmorphism
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.45)"
      : "rgba(15, 15, 20, 0.45)",
  backdropFilter: "blur(16px)",
  border: (theme) =>
    theme.palette.mode === "light"
      ? "1px solid rgba(255, 255, 255, 0.5)"
      : "1px solid rgba(255, 255, 255, 0.06)",

  boxShadow: (theme) =>
    theme.palette.mode === "light"
      ? "0 10px 40px -10px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
      : "0 20px 40px -15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
};

export const headerTitleStyles: SxProps<Theme> = {
  fontWeight: 850,
  fontSize: { xs: "1.35rem", sm: "1.6rem" },
  background: (theme) =>
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)"
      : "linear-gradient(135deg, #c084fc 0%, #f472b6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-0.03em",
  textAlign: { xs: "center", sm: "left" },
  cursor: "default",
};

export const navActionsContainerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  gap: { xs: "1.25rem", sm: "1.75rem" },
  width: { xs: "100%", sm: "auto" },
};

export const switchWrapperStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  color: "text.secondary",
  fontSize: "0.875rem",
  fontWeight: 600,
};

export const selectLanguageStyles: SxProps<Theme> = {
  minWidth: 130,
  height: 40,
  borderRadius: "12px",
  backgroundColor: (theme) =>
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4px)",
  border: (theme) =>
    theme.palette.mode === "light"
      ? "1px solid rgba(0, 0, 0, 0.05)"
      : "1px solid rgba(255, 255, 255, 0.05)",
  "& .MuiSelect-select": {
    paddingY: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.875rem",
    fontWeight: 600,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};
