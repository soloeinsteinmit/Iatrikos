// import { lazy } from "react";
import IatrikosShell from "../pages/IatrikosShell";
import Patients from "../pages/Patients";
import Dashboard from "../pages/Dashboard";
import NewPatient from "../pages/NewPatient";
import ClinicalCases from "../pages/ClinicalCases";
import NewCaseInterface from "../pages/NewCase";

// Lazy load components for better performance
// const Dashboard = lazy(() => import("../pages/Dashboard"));
// // const Patients = lazy(() => import("../pages/Patients"));
// const NewPatient = lazy(() => import("../pages/NewPatient"));
// const ClinicalCases = lazy(() => import("../pages/ClinicalCases"));
// const NewCase = lazy(() => import("../pages/NewCase"));

export const iatrikosRoutes = {
  path: "/",
  element: <IatrikosShell />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "patients",
      children: [
        {
          index: true,
          element: <Patients />,
        },
        {
          path: "new",
          element: <NewPatient />,
        },
      ],
    },
    {
      path: "cases",
      children: [
        {
          index: true,
          element: <ClinicalCases />,
        },
        {
          path: "new",
          element: <NewCaseInterface />,
        },
      ],
    },
  ],
};
