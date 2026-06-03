import React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import {
  navActionsContainerStyles,
  switchWrapperStyles,
  selectLanguageStyles,
} from "./styles";
import { useNavActions } from "./useNavActions";

export const NavActions: React.FC = () => {
  const { t, themeMode, toggleTheme, language, handleLanguageChange } =
    useNavActions();

  return (
    <Box sx={navActionsContainerStyles}>
      {/* Light / Dark Mode Toggle */}
      <Box sx={switchWrapperStyles}>
        <LightModeOutlined
          fontSize="small"
          color={themeMode === "light" ? "primary" : "inherit"}
          aria-hidden="true"
        />
        <Switch
          checked={themeMode === "dark"}
          onChange={toggleTheme}
          color="primary"
          aria-label={
            themeMode === "dark" ? t("nav.toggle_light") : t("nav.toggle_dark")
          }
        />
        <DarkModeOutlined
          fontSize="small"
          color={themeMode === "dark" ? "primary" : "inherit"}
          aria-hidden="true"
        />
      </Box>

      {/* Language Selector */}
      <FormControl variant="outlined" size="small">
        <InputLabel
          id="language-select-label"
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          {t("nav.language")}
        </InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          sx={selectLanguageStyles}
          aria-label={t("nav.language")}
          displayEmpty
          renderValue={(selected) => (
            <>
              <TranslateOutlined
                fontSize="small"
                sx={{ color: "primary.main" }}
              />
              {selected === "en" && "English"}
              {selected === "es" && "Español"}
              {selected === "ar" && "العربية"}
            </>
          )}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="ar">العربية (RTL)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default NavActions;
