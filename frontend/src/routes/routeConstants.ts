export const ROUTES = {
  ROOT: "/",
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    TWO_FACTOR: "/auth/2fa",
  },
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
  LEGAL: {
    TERMS: "/terms",
    PRIVACY: "/privacy",
  },
};
