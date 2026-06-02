import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormContext } from "../../context/FormContext.shared";
import type {
  PersonalInfo,
  FamilyFinancialInfo,
} from "../../context/FormContext.shared";
import mockUsers from "./mockUsers.json";

interface MockUser {
  id: string;
  displayName: string;
  description: string;
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
}

export const DemoAutofill: React.FC = () => {
  const { updateStepData, themeMode } = useFormContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAutofill = (user: MockUser) => {
    // 1. Update Personal Step Data
    updateStepData("personal", user.personal);
    // 2. Update Family & Financial Step Data
    updateStepData("family", user.family);

    // Set notification states
    setSelectedUserName(user.personal.name);
    setSnackbarOpen(true);

    // 3. Navigate back to /personal if they are in success screen,
    // so they can see the filled data and go through the flow
    if (location.pathname === "/success") {
      navigate("/personal");
    }

    // Close the popover
    handleClose();
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

  const open = Boolean(anchorEl);
  const id = open ? "demo-autofill-popover" : undefined;

  // Render nothing if we are in testing or not needed, but showing it everywhere is very useful!
  return (
    <Box>
      {/* Floating Action Button (FAB) */}
      <Tooltip title="Autofill Demo Users" placement="left" arrow>
        <Fab
          color="primary"
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1300,
            boxShadow: "0 8px 32px rgba(170, 59, 255, 0.4)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.1) rotate(15deg)",
            },
          }}
        >
          <AutoFixHighIcon />
        </Fab>
      </Tooltip>

      {/* Glassmorphic Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
            sx: {
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
            },
          },
        }}
      >
        <Box
          sx={{
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
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AutoFixHighIcon fontSize="small" color="primary" />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 750, color: "text.primary" }}
            >
              Demo Autofill Helper
            </Typography>
          </Box>

          <IconButton size="small" onClick={handleClose} aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, fontSize: "0.85rem" }}
          >
            Select a mock user profile to instantly autofill the <b>Personal</b>{" "}
            and <b>Family & Financial</b> steps. The <b>Situation</b> step is
            left blank for testing the AI generator.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {(mockUsers as MockUser[]).map((user) => (
              <Card key={user.id} onClick={() => handleAutofill(user)}>
                <CardContent sx={{ p: "12px !important" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {user.personal.name}
                    </Typography>

                    <Chip
                      label={user.personal.country}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        fontSize: "0.7rem",
                        height: "18px",
                        px: "2px",
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {user.description}
                  </Typography>

                  <Divider sx={{ my: 1, opacity: 0.5 }} />

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PersonIcon
                        sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.primary"
                        sx={{ textTransform: "capitalize", fontWeight: 500 }}
                      >
                        {user.personal.gender}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <PeopleIcon
                        sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.primary"
                        sx={{ fontWeight: 500 }}
                      >
                        Dep: {user.family.dependents}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <WorkIcon
                        sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.primary"
                        sx={{ textTransform: "capitalize", fontWeight: 500 }}
                      >
                        {user.family.employmentStatus.replace("_", " ")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <AttachMoneyIcon
                        sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: "primary.main",
                        }}
                      >
                        {user.family.monthlyIncome} {user.family.currency}
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <HomeIcon
                        sx={{ fontSize: "0.9rem", color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.primary"
                        sx={{ textTransform: "capitalize", fontWeight: 500 }}
                      >
                        {user.family.housingStatus}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Popover>

      {/* Toast Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            fontWeight: 600,
          }}
        >
          Autofilled {snackbarOpen ? selectedUserName : ""}'s demo data
          successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DemoAutofill;
