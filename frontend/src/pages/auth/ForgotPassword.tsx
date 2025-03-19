import React, { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email to receive reset instructions
          </p>
        </div>

        <Card className="w-full">
          <CardBody className="space-y-6">
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  isRequired
                />

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-success/10 text-success p-4 rounded-lg">
                  <p className="font-medium">Reset link sent!</p>
                  <p className="text-sm mt-1">
                    Please check your email for further instructions
                  </p>
                </div>
                <Button
                  color="primary"
                  variant="flat"
                  onClick={() => navigate("/auth/login")}
                  className="w-full"
                  size="lg"
                >
                  Return to Login
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        <Button
          variant="light"
          className="mx-auto"
          startContent={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate("/auth/login")}
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
