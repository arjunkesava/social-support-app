import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { PersonalInfo } from "../../../context/FormContext.shared";
import { useFormContext } from "../../../context/FormContext.shared";

export const useStepPersonal = () => {
  const { i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({
    values: formData.personal,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: "onTouched",
  });

  const onSubmit = (data: PersonalInfo) => {
    updateStepData("personal", data);
    setActiveStep(1);
    navigate("/family");
  };

  return {
    isRtl,
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
