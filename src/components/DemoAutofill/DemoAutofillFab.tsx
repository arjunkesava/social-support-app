import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Fab from "@mui/material/Fab";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useTranslation } from "react-i18next";

import { fabStyles } from "./styles";
import type { DemoAutofillFabProps } from "./types";

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
