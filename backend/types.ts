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
  dependents: number | "";
  employmentStatus: string;
  monthlyIncome: number | "";
  currency: string;
  housingStatus: string;
}

export type SituationField =
  | "financialSituation"
  | "employmentCircumstances"
  | "reasonForApplying";

export interface BuildPromptParams {
  field: string;
  fieldLabel: string;
  existingText?: string;
  personal?: PersonalInfo;
  family?: FamilyFinancialInfo;
  language?: string;
}

export interface OpenAIErrorResponse {
  status: number;
  message: string;
}

export interface HelpMeWriteRequest {
  field: string;
  fieldLabel: string;
  existingText?: string;
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
}
