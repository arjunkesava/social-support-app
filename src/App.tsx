import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MultiStepForm from './components/MultiStepForm/MultiStepForm';
import { Layout } from './components/Layout/Layout';
import StepRouteGuard from './components/MultiStepForm/StepRouteGuard';
import DemoAutofill from './components/MultiStepForm/DemoAutofill';

const StepPersonal = lazy(() => import('./components/MultiStepForm/StepPersonal/StepPersonal'));
const StepFamily = lazy(() => import('./components/MultiStepForm/StepFamily/StepFamily'));
const StepSituation = lazy(() => import('./components/MultiStepForm/StepSituation/StepSituation'));
const StepSuccess = lazy(() => import('./components/MultiStepForm/StepSuccess/StepSuccess'));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <DemoAutofill />
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
      </Layout>
    </BrowserRouter>
  );
}

export default App;
