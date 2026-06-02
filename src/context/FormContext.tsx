import React, { useState, useEffect } from "react";
import i18n from "../i18n/config";
import {
  FormContext,
  getInitialFormData,
  initialFormData,
  type FormData,
  type Language,
  type ThemeMode,
} from "./FormContext.shared";

export const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Restore from localStorage
  const [formData, setFormData] = useState<FormData>(getInitialFormData);

  const [activeStep, setActiveStepState] = useState<number>(() => {
    const saved = localStorage.getItem("social_support_step");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("social_support_theme");
    return (saved as ThemeMode) || "light";
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("social_support_lang");
    return (saved as Language) || "en";
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("social_support_form_data", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("social_support_step", activeStep.toString());
  }, [activeStep]);

  useEffect(() => {
    localStorage.setItem("social_support_theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("social_support_lang", language);
    i18n.changeLanguage(language);

    // Apply RTL/LTR class and attributes to document elements
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const updateStepData = <T extends keyof FormData>(
    step: T,
    data: FormData[T],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const applyDemoAutofill = (
    personal: FormData["personal"],
    family: FormData["family"],
  ) => {
    setFormData({
      personal: { ...personal },
      family: { ...family },
      situation: { ...initialFormData.situation },
    });
    setActiveStepState(0);
  };

  const setActiveStep = (step: number) => {
    setActiveStepState(step);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setActiveStepState(0);
    localStorage.removeItem("social_support_form_data");
    localStorage.removeItem("social_support_step");
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        activeStep,
        themeMode,
        language,
        updateStepData,
        applyDemoAutofill,
        setActiveStep,
        resetForm,
        toggleTheme,
        changeLanguage,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
