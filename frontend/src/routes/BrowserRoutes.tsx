import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import MainOutletLayout from "../components/layout/MainOutletLayout";
import AuthLayout from "../components/layout/AuthLayout";
import ErrorBoundary from "../components/common/ErrorBoundary";
import IatrikosShell from "../pages/IatrikosShell";
import Patients from "../pages/Patients";
import Dashboard from "../pages/Dashboard";
import PageNotFound from "../pages/PageNotFound";
import ClinicalCases from "../pages/ClinicalCases";
import NewPatient from "../pages/NewPatient";
import NewCaseInterface from "../pages/NewCase";
import CaseAnalysis from "../pages/CaseAnalysis";
import Analytics from "../pages/Analytics";
import Schedule from "../pages/Schedule";
import Settings from "../pages/Settings";

// Import auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import TwoFactorAuth from "../pages/auth/TwoFactorAuth";

// Add these imports
import TermsOfService from "../pages/legal/TermsOfService";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import { ROUTES } from "./routeConstants";
import Treatment from "../pages/Treatment";
import NewTreatmentPlan from "../pages/NewTreatmentPlan";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MainOutletLayout />}
      errorElement={<ErrorBoundary />}
    >
      {/* Auth routes */}
      <Route
        path="auth"
        element={<AuthLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="2fa" element={<TwoFactorAuth />} />
      </Route>

      {/* Protected routes */}
      <Route
        path="/"
        element={<IatrikosShell />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="cases" element={<ClinicalCases />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="patients/new" element={<NewPatient />} />
        <Route path="cases/new" element={<NewCaseInterface />} />
        <Route path="cases/current/analysis" element={<CaseAnalysis />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="settings" element={<Settings />} />
        {/* <Route path="notifications" element={<Notifications />} /> */}
        <Route path="treatment" element={<Treatment />} />
        <Route path="treatment/new" element={<NewTreatmentPlan />} />
      </Route>

      {/* Legal routes */}
      <Route path={ROUTES.LEGAL.TERMS} element={<TermsOfService />} />
      <Route path={ROUTES.LEGAL.PRIVACY} element={<PrivacyPolicy />} />

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
