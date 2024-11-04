import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { AlertCircle } from "lucide-react";

const KeyFindings: React.FC = () => {
  const findings = [
    "Elevated temperature (38.5°C)",
    "Persistent cough for 5 days",
    "History of seasonal allergies",
  ];

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <h3 className="font-inter font-medium text-gray-800">Key Findings</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          {findings.map((finding, index) => (
            <div key={index} className="flex items-start space-x-2">
              <AlertCircle size={16} className="text-blue-600 mt-0.5" />
              <p className="text-sm text-gray-600">{finding}</p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default KeyFindings;
