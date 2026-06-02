import React from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useTranslation } from "react-i18next";
import type { DemoAutofillFabProps } from "./types";
import { fabStyles } from "./styles";

export const DemoAutofillFab: React.FC<DemoAutofillFabProps> = ({
  popoverId,
  onOpen,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const tooltipPlacement = theme.direction === "rtl" ? "right" : "left";

  return (
    <Tooltip
      title={t("demo_autofill.fab_tooltip")}
      placement={tooltipPlacement}
      arrow
    >
      <Fab
        color="primary"
        aria-describedby={popoverId}
        onClick={onOpen}
        sx={fabStyles}
      >
        <AutoFixHighIcon />
      </Fab>
    </Tooltip>
  );
};

export default DemoAutofillFab;
