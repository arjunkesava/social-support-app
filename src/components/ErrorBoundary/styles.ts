import type { SxProps, Theme } from "@mui/material";

export const errorContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  gap: 2,
  p: 4,
  textAlign: "center",
};
