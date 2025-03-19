import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import {
  Mail,
  Lock,
  Github,
  Chrome,
  User,
  Briefcase,
  Phone,
} from "lucide-react";

// import { FaGoogle } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routeConstants";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const specialties = [
    { value: "general", label: "General Physician" },
    { value: "cardiology", label: "Cardiologist" },
    { value: "dermatology", label: "Dermatologist" },
    { value: "pediatrics", label: "Pediatrician" },
    { value: "neurology", label: "Neurologist" },
    { value: "oncology", label: "Oncologist" },
    { value: "orthopedics", label: "Orthopedic Surgeon" },
    { value: "psychiatry", label: "Psychiatrist" },
    { value: "urology", label: "Urologist" },
    { value: "endocrinology", label: "Endocrinologist" },
    { value: "gastroenterology", label: "Gastroenterologist" },
    { value: "hematology", label: "Hematologist" },
    { value: "immunology", label: "Immunologist" },
    { value: "nephrology", label: "Nephrologist" },
    { value: "pulmonology", label: "Pulmonologist" },
    { value: "geriatrics", label: "Geriatrician" },
    { value: "infectious_disease", label: "Infectious Disease Specialist" },
    { value: "rehabilitation", label: "Rehabilitation Specialist" },
    { value: "surgery", label: "Surgeon" },
    { value: "trauma", label: "Trauma Surgeon" },
    { value: "vascular", label: "Vascular Surgeon" },
    { value: "neuroscience", label: "Neuroscience Specialist" },
    { value: "critical_care", label: "Critical Care Specialist" },
    { value: "sleep_medicine", label: "Sleep Medicine Specialist" },
    { value: "sports_medicine", label: "Sports Medicine Specialist" },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your registration logic here
    setTimeout(() => {
      setIsLoading(false);
      navigate(ROUTES.AUTH.VERIFY_EMAIL);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-gray-600">
            Join Iatrikos to manage your practice
          </p>
        </div>

        <Card className="w-full p-4">
          <CardBody className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  isRequired
                />
                <Input
                  label="Last Name"
                  placeholder="Smith"
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  isRequired
                />
              </div>

              <Input
                label="Email"
                placeholder="doctor@example.com"
                type="email"
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
                isRequired
              />

              <Input
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                startContent={<Phone className="w-4 h-4 text-gray-400" />}
                isRequired
              />

              <Select
                label="Specialty"
                placeholder="Select your specialty"
                startContent={<Briefcase className="w-4 h-4 text-gray-400" />}
                isRequired
              >
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </SelectItem>
                ))}
              </Select>

              <Input
                label="Password"
                placeholder="Create a password"
                type="password"
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                startContent={<Lock className="w-4 h-4 text-gray-400" />}
                isRequired
              />

              <Checkbox defaultSelected size="sm">
                I agree to the{" "}
                <Link to={ROUTES.LEGAL.TERMS} className="text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to={ROUTES.LEGAL.PRIVACY} className="text-primary">
                  Privacy Policy
                </Link>
              </Checkbox>

              <Button
                type="submit"
                color="primary"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            <div className="relative">
              <Divider className="my-4" />
              <span className="px-2 text-gray-500 text-sm">
                Or sign up with
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
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
