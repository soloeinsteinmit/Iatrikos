import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LabResult {
  test: string;
  value: number;
  unit: string;
  normalRange: string;
  status: "high" | "low" | "normal";
  trend: "up" | "down" | "stable";
  timestamp: string;
}

export const LabInterpretation: React.FC = () => {
  const labResults: LabResult[] = [
    {
      test: "White Blood Cell Count",
      value: 12.5,
      unit: "K/µL",
      normalRange: "4.5-11.0",
      status: "high",
      trend: "up",
      timestamp: "2024-03-15",
    },
    {
      test: "Hemoglobin",
      value: 13.2,
      unit: "g/dL",
      normalRange: "13.5-17.5",
      status: "low",
      trend: "down",
      timestamp: "2024-03-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "danger";
      case "low":
        return "warning";
      default:
        return "success";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-danger" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-warning" />;
      default:
        return <Minus className="h-4 w-4 text-success" />;
    }
  };

  return (
    <div className="space-y-4">
      <CardHeader>
        <h3 className="text-xl font-semibold">Lab Results</h3>
      </CardHeader>
      <CardBody>
        {labResults.map((result, index) => (
          <Card key={index} className="mb-4 border-1 shadow-sm">
            <CardBody>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{result.test}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">
                      {result.value} {result.unit}
                    </span>
                    {getTrendIcon(result.trend)}
                  </div>
                </div>
                <Chip color={getStatusColor(result.status)} variant="flat">
                  {result.status.toUpperCase()}
                </Chip>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                <div>
                  Normal Range: {result.normalRange} {result.unit}
                </div>
                <div>Last Updated: {result.timestamp}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </div>
  );
};
