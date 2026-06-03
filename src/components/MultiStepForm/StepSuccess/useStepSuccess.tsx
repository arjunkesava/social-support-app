import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useFormContext } from "../../../context/FormContext.shared";
import { reviewGridLabelStyles, reviewGridValueStyles } from "../styles";

export const useStepSuccess = () => {
  const { t } = useTranslation();
  const { formData, resetForm } = useFormContext();
  const navigate = useNavigate();

  const monthlyIncome =
    formData.family.monthlyIncome !== ""
      ? `${formData.family.currency} ${formData.family.monthlyIncome}`
      : "";

  const translateOption = (key: string, fallback: string) =>
    t(key, { defaultValue: fallback });

  const handleReset = () => {
    resetForm();
    navigate("/personal");
  };

  const renderDetailItem = (label: string, value: string | number) => (
    <Box sx={{ marginBottom: "1.25rem" }}>
      <Typography sx={reviewGridLabelStyles}>{label}</Typography>
      <Typography sx={reviewGridValueStyles}>
        {value !== undefined && value !== "" ? value : t("success.no_value")}
      </Typography>
    </Box>
  );

  return {
    formData,
    monthlyIncome,
    translateOption,
    renderDetailItem,
    handleReset,
  };
};
