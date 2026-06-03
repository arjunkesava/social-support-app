import type { ReactNode } from "react";

export const stepPathIndexes: Record<string, number> = {
  "/personal": 0,
  "/family": 1,
  "/situation": 2,
  "/success": 3,
};

export interface StepRouteGuardProps {
  children: ReactNode;
  stepIndex: number;
}
