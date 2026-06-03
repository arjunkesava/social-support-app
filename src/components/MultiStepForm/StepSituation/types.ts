import type { SituationField } from "../../../services/writingSuggestions";

export type { SituationField } from "../../../services/writingSuggestions";

export const situationFieldLabelKeys: Record<SituationField, string> = {
  financialSituation: "situation.financial_situation",
  employmentCircumstances: "situation.employment_circumstances",
  reasonForApplying: "situation.reason_for_applying",
};

export const situationFields: SituationField[] = [
  "financialSituation",
  "employmentCircumstances",
  "reasonForApplying",
];

export const situationFieldIds: Record<SituationField, string> = {
  financialSituation: "situation-financial",
  employmentCircumstances: "situation-employment",
  reasonForApplying: "situation-reason",
};

export const situationPlaceholderKeys: Record<SituationField, string> = {
  financialSituation: "situation.financial_situation_placeholder",
  employmentCircumstances: "situation.employment_circumstances_placeholder",
  reasonForApplying: "situation.reason_for_applying_placeholder",
};
