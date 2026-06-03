import type { ReactNode } from "react";
import type { FormData } from "../../../context/FormContext.shared";

export interface UseStepSuccessReturn {
  formData: FormData;
  monthlyIncome: string;
  translateOption: (key: string, fallback: string) => string;
  renderDetailItem: (label: string, value: string | number) => ReactNode;
  handleReset: () => void;
}
