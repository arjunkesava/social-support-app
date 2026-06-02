import { createContext, useContext } from 'react';

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
  currency: string;
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

export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'es' | 'ar';

export interface FormContextType {
  formData: FormData;
  activeStep: number;
  themeMode: ThemeMode;
  language: Language;
  updateStepData: <T extends keyof FormData>(step: T, data: FormData[T]) => void;
  applyDemoAutofill: (
    personal: PersonalInfo,
    family: FamilyFinancialInfo,
  ) => void;
  setActiveStep: (step: number) => void;
  toggleTheme: () => void;
  changeLanguage: (lang: Language) => void;
  resetForm: () => void;
}

export const initialFormData: FormData = {
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
    dependents: 0,
    employmentStatus: '',
    monthlyIncome: 0,
    currency: '',
    housingStatus: '',
  },
  situation: {
    financialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

export const getInitialFormData = (): FormData => {
  const saved = localStorage.getItem('social_support_form_data');

  if (!saved) {
    return initialFormData;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<FormData>;

    return {
      personal: {
        ...initialFormData.personal,
        ...parsed.personal,
      },
      family: {
        ...initialFormData.family,
        ...parsed.family,
      },
      situation: {
        ...initialFormData.situation,
        ...parsed.situation,
      },
    };
  } catch {
    return initialFormData;
  }
};

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return context;
};
