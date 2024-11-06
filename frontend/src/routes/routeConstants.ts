export const ROUTES = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  PATIENTS: {
    ROOT: "/patients",
    NEW: "/patients/new",
    LIST: "/patients",
  },
  CASES: {
    ROOT: "/cases",
    NEW: "/cases/new",
    LIST: "/cases",
    CURRENT_ANALYSIS: "/cases/current/analysis",
    ANALYSIS: "/cases/:caseId/analysis",
  },
  ANALYTICS: "/analytics",
  SCHEDULE: "/schedule",
  SETTINGS: "/settings",
};
