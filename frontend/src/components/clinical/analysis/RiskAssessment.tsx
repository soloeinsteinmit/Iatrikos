import React from "react";
import { Card, CardBody, CardHeader, Progress, Chip } from "@nextui-org/react";
import { AlertTriangle, Shield, Activity } from "lucide-react";

interface RiskFactor {
  name: string;
  score: number;
  severity: "low" | "moderate" | "high";
  recommendations: string[];
}

export const RiskAssessment: React.FC = () => {
  const riskFactors: RiskFactor[] = [
    {
      name: "Cardiovascular Risk",
      score: 75,
      severity: "high",
      recommendations: [
        "Monitor blood pressure daily",
        "Consider lipid panel",
        "Lifestyle modifications",
      ],
    },
    {
      name: "Diabetes Risk",
      score: 45,
      severity: "moderate",
      recommendations: ["Regular glucose monitoring", "Diet modification"],
    },
    {
      name: "Family History Impact",
      score: 30,
      severity: "low",
      recommendations: ["Annual screening", "Preventive care"],
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger";
      case "moderate":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <div className="space-y-4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Risk Assessment</h3>
        </div>
      </CardHeader>
      <CardBody>
        {riskFactors.map((risk, index) => (
          <Card key={index} className="mb-4 border-1 shadow-sm">
            <CardBody className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium">{risk.name}</h4>
                </div>
                <Chip color={getSeverityColor(risk.severity)} variant="flat">
                  {risk.severity.toUpperCase()}
                </Chip>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Risk Score</span>
                  <span className="font-medium">{risk.score}%</span>
                </div>
                <Progress
                  value={risk.score}
                  color={getSeverityColor(risk.severity)}
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  Recommendations
                </div>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {risk.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </div>
  );
};
