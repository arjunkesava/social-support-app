import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/config';

export interface PersonalInfo {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface FamilyFinancialInfo {
  maritalStatus: string;
  dependents: number | '';
  employmentStatus: string;
  monthlyIncome: number | '';
  housingStatus: string;
}

export interface SituationDescriptions {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface FormData {
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
  situation: SituationDescriptions;
}

const initialFormData: FormData = {
  personal: {
    name: '',
    nationalId: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  family: {
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    monthlyIncome: '',
    housingStatus: '',
  },
  situation: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'es' | 'ar';

interface FormContextType {
  formData: FormData;
  activeStep: number;
  themeMode: ThemeMode;
  language: Language;
  updateStepData: <T extends keyof FormData>(step: T, data: FormData[T]) => void;
  setActiveStep: (step: number) => void;
  toggleTheme: () => void;
  changeLanguage: (lang: Language) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restore from localStorage
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem('social_support_form_data');
    return saved ? JSON.parse(saved) : initialFormData;
  });

  const [activeStep, setActiveStepState] = useState<number>(() => {
    const saved = localStorage.getItem('social_support_step');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('social_support_theme');
    return (saved as ThemeMode) || 'light';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('social_support_lang');
    return (saved as Language) || 'en';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('social_support_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('social_support_step', activeStep.toString());
  }, [activeStep]);

  useEffect(() => {
    localStorage.setItem('social_support_theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('social_support_lang', language);
    i18n.changeLanguage(language);

    // Apply RTL/LTR class and attributes to document elements
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.body.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  const updateStepData = <T extends keyof FormData>(step: T, data: FormData[T]) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const setActiveStep = (step: number) => {
    setActiveStepState(step);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setActiveStepState(0);
    localStorage.removeItem('social_support_form_data');
    localStorage.removeItem('social_support_step');
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        activeStep,
        themeMode,
        language,
        updateStepData,
        setActiveStep,
        toggleTheme,
        changeLanguage,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
};
