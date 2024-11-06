import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { Button } from "@nextui-org/react";
import { Home, RefreshCw } from "lucide-react";

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Oops!</h1>
          <p className="text-gray-600">{errorMessage}</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            color="primary"
            variant="flat"
            startContent={<Home className="w-4 h-4" />}
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
          <Button
            color="primary"
            startContent={<RefreshCw className="w-4 h-4" />}
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
