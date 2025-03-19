import React from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle, Info } from "lucide-react";
import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Button,
  Chip,
} from "@nextui-org/react";

interface SafetyCheck {
  name: string;
  completed: boolean;
  timestamp: string;
  details?: string;
  priority: "high" | "medium" | "low";
  actionRequired?: string;
  lastUpdated: string;
  progress: number;
}

const SafetyChecksCompleted: React.FC = () => {
  const safetyChecks: SafetyCheck[] = [
    {
      name: "Drug Interactions",
      completed: true,
      timestamp: "2024-03-15 14:30",
      details: "No significant interactions found",
      priority: "high",
      lastUpdated: "5 minutes ago",
      progress: 100,
    },
    {
      name: "Allergy Screen",
      completed: true,
      timestamp: "2024-03-15 14:25",
      details: "Patient history reviewed",
      priority: "high",
      lastUpdated: "10 minutes ago",
      progress: 100,
    },
    {
      name: "Dosage Verification",
      completed: false,
      timestamp: "2024-03-15 14:20",
      details: "Pending physician review",
      priority: "high",
      actionRequired: "Review medication dosages",
      lastUpdated: "15 minutes ago",
      progress: 75,
    },
    {
      name: "Contraindications",
      completed: true,
      timestamp: "2024-03-15 14:15",
      details: "All clear",
      priority: "medium",
      lastUpdated: "20 minutes ago",
      progress: 100,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      default:
        return "success";
    }
  };

  return (
    <Card className="p-4">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <h3 className="font-inter font-medium text-gray-800">
              Safety Checks
            </h3>
            <Chip size="sm" color="primary" variant="flat">
              {safetyChecks.filter((check) => check.completed).length}/
              {safetyChecks.length} Complete
            </Chip>
          </div>
          <Button
            size="sm"
            color="primary"
            variant="light"
            startContent={<AlertTriangle className="h-4 w-4" />}
            isDisabled={safetyChecks.every((check) => check.completed)}
          >
            Resolve Issues
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {safetyChecks.map((check) => (
            <div
              key={check.name}
              className={`p-3 rounded-lg border ${
                check.completed ? "bg-gray-50" : "bg-danger-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {check.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">{check.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Last updated {check.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <Chip
                  size="sm"
                  color={getPriorityColor(check.priority)}
                  variant="flat"
                >
                  {check.priority} priority
                </Chip>
              </div>

              <div className="space-y-2">
                {check.details && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Info className="h-4 w-4" />
                    <span>{check.details}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{check.progress}%</span>
                  </div>
                  <Progress
                    value={check.progress}
                    color={check.completed ? "success" : "warning"}
                    size="sm"
                  />
                </div>

                {check.actionRequired && (
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="w-full mt-2"
                  >
                    {check.actionRequired}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default SafetyChecksCompleted;
