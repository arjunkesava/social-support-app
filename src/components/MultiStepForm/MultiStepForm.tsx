import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import StepFormSkeleton from "./StepFormSkeleton";
import {
  activeStepFormStyles,
  cardContentStyles,
  cardHeaderStyles,
  headerTypographyStyles,
  stepperStyles,
  wizardCardStyles,
} from "./styles";
import { stepPathIndexes } from "./types";

export const MultiStepForm: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const activeRouteStep = stepPathIndexes[pathname] ?? 0;

  const steps = [
    t("steps.personal"),
    t("steps.financial"),
    t("steps.situation"),
  ];

  const isSuccessPage = pathname === "/success";
  const stepperActiveStep = Math.min(activeRouteStep, steps.length - 1);

  return (
    <Card sx={wizardCardStyles} className="form-wizard-card">
      {/* Dynamic Header based on active step */}
      <CardHeader
        sx={cardHeaderStyles}
        title={
          <Typography variant="h2" sx={headerTypographyStyles}>
            {activeRouteStep < 3 ? steps[activeRouteStep] : t("steps.success")}
          </Typography>
        }
      />

      <CardContent sx={cardContentStyles}>
        <Box sx={{ width: "100%" }}>
          {!isSuccessPage ? (
            <Stepper
              activeStep={stepperActiveStep}
              sx={stepperStyles}
              alternativeLabel
              nonLinear={false}
              role="group"
              aria-label={t("steps.progress_label")}
              aria-describedby="application-step-status"
            >
              {steps.map((label, index) => (
                <Step
                  key={index}
                  completed={index < stepperActiveStep}
                  aria-current={
                    index === stepperActiveStep ? "step" : undefined
                  }
                  aria-labelledby={`application-step-label-${index}`}
                >
                  <StepLabel id={`application-step-label-${index}`}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : null}

          <Typography
            id="application-step-status"
            component="p"
            variant="body2"
            sx={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clipPath: "inset(50%)",
              whiteSpace: "nowrap",
              border: 0,
            }}
          >
            {isSuccessPage
              ? t("steps.success")
              : t("steps.progress_status", {
                  current: stepperActiveStep + 1,
                  total: steps.length,
                  label: steps[stepperActiveStep],
                })}
          </Typography>

          {/* Active Step Form Content */}
          <Box sx={activeStepFormStyles}>
            <Suspense fallback={<StepFormSkeleton />}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default MultiStepForm;
