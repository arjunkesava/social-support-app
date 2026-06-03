import Box from "@mui/material/Box";
import React from "react";

import { DemoAutofillFab } from "./DemoAutofillFab";
import { DemoAutofillPopover } from "./DemoAutofillPopover";
import { DemoAutofillSnackbar } from "./DemoAutofillSnackbar";
import type { DemoAutofillProps } from "./types";

export const DemoAutofill: React.FC<DemoAutofillProps> = ({
  themeMode,
  popoverId,
  popoverOpen,
  anchorEl,
  users,
  snackbarOpen,
  selectedUserName,
  onFabClick,
  onPopoverClose,
  onSelectUser,
  onSnackbarClose,
}) => {
  return (
    <Box>
      <DemoAutofillFab popoverId={popoverId} onOpen={onFabClick} />

      <DemoAutofillPopover
        popoverId={popoverId}
        open={popoverOpen}
        anchorEl={anchorEl}
        themeMode={themeMode}
        users={users}
        onClose={onPopoverClose}
        onSelectUser={onSelectUser}
      />

      <DemoAutofillSnackbar
        open={snackbarOpen}
        selectedUserName={selectedUserName}
        onClose={onSnackbarClose}
      />
    </Box>
  );
};

export default DemoAutofill;
