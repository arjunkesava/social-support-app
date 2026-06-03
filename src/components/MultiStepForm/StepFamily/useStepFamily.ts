import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { FamilyFinancialInfo } from "../../../context/FormContext.shared";
import { useFormContext } from "../../../context/FormContext.shared";

export const useStepFamily = () => {
  const { i18n } = useTranslation();
  const { formData, updateStepData, setActiveStep } = useFormContext();
  const navigate = useNavigate();

  const isRtl = i18n.language === "ar";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FamilyFinancialInfo>({
    values: formData.family,
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: "onTouched",
  });

  const onSubmit = (data: FamilyFinancialInfo) => {
    updateStepData("family", data);
    setActiveStep(2);
    navigate("/situation");
  };

  const handleBack = () => {
    navigate("/personal");
  };

  return {
    isRtl,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleBack,
  };
};
