import React, { useState } from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { Check, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your verification logic here
    setTimeout(() => {
      setIsLoading(false);
      setIsVerified(true);
    }, 1000);
  };

  const handleResendCode = () => {
    // Add your resend code logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to your email
          </p>
        </div>

        <Card className="w-full p-4">
          <CardBody className="space-y-6">
            {!isVerified ? (
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 text-center"
                      size="lg"
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                >
                  Verify Email
                </Button>

                <div className="text-center">
                  <Button
                    variant="light"
                    startContent={<RefreshCw className="w-4 h-4" />}
                    onClick={handleResendCode}
                  >
                    Resend Code
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-success/10 text-success p-4 rounded-lg">
                  <Check className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Email Verified!</p>
                  <p className="text-sm mt-1">
                    Your email has been successfully verified
                  </p>
                </div>
                <Button
                  color="primary"
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                  size="lg"
                >
                  Continue to Dashboard
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
