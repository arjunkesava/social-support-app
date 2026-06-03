import type { Control, FieldErrors } from "react-hook-form";

import type { PersonalInfo } from "../../../context/FormContext.shared";

export interface UseStepPersonalReturn {
  isRtl: boolean;
  control: Control<PersonalInfo>;
  errors: FieldErrors<PersonalInfo>;
  handleSubmit: ReturnType<
    typeof import("react-hook-form").useForm<PersonalInfo>
  >["handleSubmit"];
  onSubmit: (data: PersonalInfo) => void;
}
