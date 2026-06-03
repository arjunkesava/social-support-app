import type { Control, FieldErrors } from "react-hook-form";
import type { FamilyFinancialInfo } from "../../../context/FormContext.shared";

export const currencyOptions = [
  "INR",
  "AED",
  "BHD",
  "KWD",
  "OMR",
  "QAR",
  "SAR",
] as const;

export interface UseStepFamilyReturn {
  isRtl: boolean;
  control: Control<FamilyFinancialInfo>;
  errors: FieldErrors<FamilyFinancialInfo>;
  handleSubmit: ReturnType<
    typeof import("react-hook-form").useForm<FamilyFinancialInfo>
  >["handleSubmit"];
  onSubmit: (data: FamilyFinancialInfo) => void;
  handleBack: () => void;
}
