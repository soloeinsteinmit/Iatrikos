import React, { useState } from "react";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { Lock, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setResetComplete(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create New Password
          </h2>
          <p className="mt-2 text-gray-600">
            Please enter your new password below
          </p>
        </div>

        <Card className="w-full p-4">
          <CardBody className="space-y-6">
            {!resetComplete ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="New Password"
                  placeholder="Enter new password"
                  type="password"
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  isRequired
                />
                <Input
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  type="password"
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  isRequired
                />

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Reset Password
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-success/10 text-success p-4 rounded-lg">
                  <Check className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Password Reset Successful!</p>
                  <p className="text-sm mt-1">
                    Your password has been successfully updated
                  </p>
                </div>
                <Button
                  color="primary"
                  onClick={() => navigate("/auth/login")}
                  className="w-full"
                  size="lg"
                >
                  Continue to Login
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
