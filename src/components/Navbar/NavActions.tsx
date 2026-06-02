import React from "react";
import {
  Box,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import TranslateOutlined from "@mui/icons-material/TranslateOutlined";
import { useTranslation } from "react-i18next";
import { useFormContext } from "../../context/FormContext.shared";
import type { Language } from "../../context/FormContext.shared";
import {
  navActionsContainerStyles,
  switchWrapperStyles,
  selectLanguageStyles,
} from "./styles";

export const NavActions: React.FC = () => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme, language, changeLanguage } = useFormContext();

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    changeLanguage(event.target.value as Language);
  };

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
        <InputLabel id="language-select-label" sx={{ display: "none" }}>
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
