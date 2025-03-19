import React from "react";
import { Card, CardBody, Progress, Chip } from "@nextui-org/react";
import { Bot, Brain, Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface AnalysisStep {
  name: string;
  status: "completed" | "in-progress" | "pending" | "error";
  progress: number;
  timeRemaining?: string;
  error?: string;
}

const AnalysisStatus: React.FC = () => {
  const steps: AnalysisStep[] = [
    {
      name: "Data Collection",
      status: "completed",
      progress: 100,
    },
    {
      name: "Clinical Analysis",
      status: "in-progress",
      progress: 65,
      timeRemaining: "2 minutes",
    },
    {
      name: "Risk Assessment",
      status: "pending",
      progress: 0,
    },
    {
      name: "Recommendations",
      status: "pending",
      progress: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "primary";
      case "error":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "in-progress":
        return <Brain className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const overallProgress = Math.round(
    steps.reduce((acc, step) => acc + step.progress, 0) / steps.length
  );

  return (
    <Card className="p-4">
      <CardBody>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-inter font-medium text-lg">AI Analysis</h3>
                <p className="text-sm text-gray-500">
                  {overallProgress === 100
                    ? "Analysis complete"
                    : `Analysis in progress - ${overallProgress}%`}
                </p>
              </div>
            </div>
            <Chip
              color={overallProgress === 100 ? "success" : "primary"}
              variant="flat"
            >
              {overallProgress === 100 ? "Complete" : "Processing"}
            </Chip>
          </div>

          <Progress
            value={overallProgress}
            color={overallProgress === 100 ? "success" : "primary"}
            className="w-full"
            size="md"
          />

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-1/4">
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
                <div className="flex-1">
                  <Progress
                    value={step.progress}
                    color={getStatusColor(step.status)}
                    size="sm"
                  />
                </div>
                <div className="w-32 flex items-center justify-end gap-2">
                  <Chip
                    size="sm"
                    color={getStatusColor(step.status)}
                    variant="flat"
                    startContent={getStatusIcon(step.status)}
                  >
                    {step.status}
                  </Chip>
                </div>
              </div>
            ))}
          </div>

          {steps.some((step) => step.status === "in-progress") && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>
                Estimated completion in{" "}
                {steps.find((s) => s.status === "in-progress")?.timeRemaining}
              </span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default AnalysisStatus;
