import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { Mail, Lock, Github, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="w-full p-4">
          <CardBody className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
              />
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />

              <div className="flex items-center justify-between">
                <Checkbox defaultSelected size="sm">
                  Remember me
                </Checkbox>
                <Link
                  to={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="text-sm text-primary"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </form>

            <div className="relative">
              <Divider className="my-4" />
              <span className="px-2 text-gray-500 text-sm">
                Or continue with
              </span>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button
                  variant="flat"
                  startContent={<Chrome className="w-4 h-4" />}
                >
                  Google
                </Button>
                <Button
                  variant="flat"
                  startContent={<Github className="w-4 h-4" />}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={ROUTES.AUTH.REGISTER} className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
