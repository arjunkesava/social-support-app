import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormContext } from "../../context/FormContext.shared";
import mockUsers from "./mockUsers.json";
import type { DemoAutofillProps, MockUser } from "./types";

export const useDemoAutofill = (): DemoAutofillProps => {
  const { applyDemoAutofill, themeMode } = useFormContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleFabClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSelectUser = (user: MockUser) => {
    applyDemoAutofill(user.personal, user.family);

    setSelectedUserName(user.personal.name);
    setSnackbarOpen(true);

    if (location.pathname !== "/personal") {
      navigate("/personal");
    }

    handlePopoverClose();
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? "demo-autofill-popover" : undefined;

  return {
    themeMode,
    popoverId,
    popoverOpen,
    anchorEl,
    users: mockUsers as MockUser[],
    snackbarOpen,
    selectedUserName,
    onFabClick: handleFabClick,
    onPopoverClose: handlePopoverClose,
    onSelectUser: handleSelectUser,
    onSnackbarClose: handleSnackbarClose,
  };
};
