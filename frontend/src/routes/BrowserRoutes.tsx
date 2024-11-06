import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// import { routeConfig } from "./routeConfig";
import MainOutletLayout from "../components/layout/MainOutletLayout";
import IatrikosShell from "../pages/IatrikosShell";
import Patients from "../pages/Patients";
import Dashboard from "../pages/Dashboard";
import PageNotFound from "../pages/PageNotFound";
import ClinicalCases from "../pages/ClinicalCases";

import NewPatient from "../pages/NewPatient";
import NewCaseInterface from "../pages/NewCase";
import CaseAnalysis from "../pages/CaseAnalysis";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainOutletLayout />}>
      {/* Public routes */}
      <Route path="/" element={<IatrikosShell />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="cases" element={<ClinicalCases />} />
        <Route path="patients/new" element={<NewPatient />} />
        <Route path="cases/new" element={<NewCaseInterface />} />
        {/* <Route path="/cases/:caseId/analysis" element={<CaseAnalysis />} /> */}
        <Route path="cases/current/analysis" element={<CaseAnalysis />} />
      </Route>

      {/* Dashboard routes */}

      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
