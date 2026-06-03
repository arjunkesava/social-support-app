import { useTranslation } from "react-i18next";
import { useFormContext } from "../../context/FormContext.shared";
import type { Language } from "../../context/FormContext.shared";
import type { SelectChangeEvent } from "@mui/material";

export const useNavActions = () => {
  const { t } = useTranslation();
  const { themeMode, toggleTheme, language, changeLanguage } = useFormContext();

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    changeLanguage(event.target.value as Language);
  };

  return {
    t,
    themeMode,
    toggleTheme,
    language,
    handleLanguageChange,
  };
};
