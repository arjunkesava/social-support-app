import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React from "react";
import { Trans } from "react-i18next";

import { DemoAutofillPopoverHeader } from "./DemoAutofillPopoverHeader";
import { DemoAutofillUserCard } from "./DemoAutofillUserCard";
import {
  getPopoverPaperStyles,
  popoverContentStyles,
  popoverDescriptionStyles,
  userListStyles,
} from "./styles";
import type { DemoAutofillPopoverProps } from "./types";

export const DemoAutofillPopover: React.FC<DemoAutofillPopoverProps> = ({
  popoverId,
  open,
  anchorEl,
  themeMode,
  users,
  onClose,
  onSelectUser,
}) => {
  return (
    <Popover
      id={popoverId}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: getPopoverPaperStyles(themeMode),
        },
      }}
    >
      <DemoAutofillPopoverHeader themeMode={themeMode} onClose={onClose} />

      <Box sx={popoverContentStyles}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={popoverDescriptionStyles}
        >
          <Trans
            i18nKey="demo_autofill.description"
            components={{
              1: <Box component="b" sx={{ display: "inline" }} />,
              2: <Box component="b" sx={{ display: "inline" }} />,
              3: <Box component="b" sx={{ display: "inline" }} />,
            }}
          />
        </Typography>

        <Box sx={userListStyles}>
          {users.map((user) => (
            <DemoAutofillUserCard
              key={user.id}
              user={user}
              onSelect={onSelectUser}
            />
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default DemoAutofillPopover;
