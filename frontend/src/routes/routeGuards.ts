import { Navigate, replace } from "react-router-dom";
import { ROUTES } from "./routeConstants";

export const withAuthGuard = (route: any) => {
  return {
    ...route,
    children: route.children?.map((child: any) => ({
      ...child,
      element: <AuthGuard>{child.element}</AuthGuard>,
    })),
  };
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = false; // Replace with your auth logic

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
