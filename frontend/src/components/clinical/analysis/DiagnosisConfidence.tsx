import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Diagnosis {
  name: string;
  confidence: number;
}

const DiagnosisConfidence: React.FC = () => {
  const diagnoses: Diagnosis[] = [
    { name: "Upper Respiratory Infection", confidence: 85 },
    { name: "Seasonal Allergies", confidence: 60 },
  ];

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <h3 className="font-inter font-medium text-gray-800">
          Diagnosis Confidence
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {diagnoses.map((diagnosis, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{diagnosis.name}</span>
                <span className="text-sm font-medium text-gray-900">
                  {diagnosis.confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${diagnosis.confidence}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default DiagnosisConfidence;
