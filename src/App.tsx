import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import DemoAutofill from "./components/DemoAutofill";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Layout } from "./components/Layout/Layout";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import StepRouteGuard from "./components/MultiStepForm/StepRouteGuard";
import Navbar from "./components/Navbar/Navbar";

const StepPersonal = lazy(
  () => import("./components/MultiStepForm/StepPersonal/StepPersonal"),
);
const StepFamily = lazy(
  () => import("./components/MultiStepForm/StepFamily/StepFamily"),
);
const StepSituation = lazy(
  () => import("./components/MultiStepForm/StepSituation/StepSituation"),
);
const StepSuccess = lazy(
  () => import("./components/MultiStepForm/StepSuccess/StepSuccess"),
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
          <Navbar />
          <Routes>
            <Route element={<MultiStepForm />}>
              <Route index element={<Navigate to="/personal" replace />} />
              <Route path="personal" element={<StepPersonal />} />
              <Route
                path="family"
                element={
                  <StepRouteGuard stepIndex={1}>
                    <StepFamily />
                  </StepRouteGuard>
                }
              />
              <Route
                path="situation"
                element={
                  <StepRouteGuard stepIndex={2}>
                    <StepSituation />
                  </StepRouteGuard>
                }
              />
              <Route
                path="success"
                element={
                  <StepRouteGuard stepIndex={3}>
                    <StepSuccess />
                  </StepRouteGuard>
                }
              />
              <Route path="*" element={<Navigate to="/personal" replace />} />
            </Route>
          </Routes>
          <DemoAutofill />
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
