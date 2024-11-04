import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface SafetyCheck {
  name: string;
  completed: boolean;
}

const SafetyChecksCompleted: React.FC = () => {
  // This would typically come from props or an API
  const safetyChecks: SafetyCheck[] = [
    { name: "Drug Interactions", completed: true },
    { name: "Allergy Screen", completed: true },
    { name: "Dosage Verification", completed: false },
    { name: "Contraindications", completed: true },
  ];

  return (
    <Card className="p-4">
      <CardHeader>
        <h3 className="font-inter font-medium text-gray-800">Safety Checks</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          {safetyChecks.map((check) => (
            <div
              key={check.name}
              className="flex items-center justify-between py-1"
            >
              <span className="text-sm text-gray-600">{check.name}</span>
              {check.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default SafetyChecksCompleted;
