import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useFormContext } from '../../context/FormContext.shared';

const stepRoutes = ['/personal', '/family', '/situation', '/success'];

interface StepRouteGuardProps {
  children: ReactNode;
  stepIndex: number;
}

export const StepRouteGuard = ({ children, stepIndex }: StepRouteGuardProps) => {
  const { activeStep } = useFormContext();

  if (stepIndex > activeStep) {
    return <Navigate to={stepRoutes[Math.max(activeStep, 0)] ?? '/personal'} replace />;
  }

  return children;
};

export default StepRouteGuard;
