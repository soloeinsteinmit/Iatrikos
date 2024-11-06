import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
} from "@nextui-org/react";
import {
  Clock,

  ChevronRight,
  Calendar,
  FileText,
  Pill,
} from "lucide-react";

interface Action {
  id: string;
  title: string;
  type: "test" | "procedure" | "medication";
  priority: "urgent" | "high" | "normal";
  status: "pending" | "scheduled" | "completed";
  dueWithin: string;
  rationale: string;
  progress: number;
  relatedFindings?: string[];
}

const RecommendedActions: React.FC = () => {
  const actions: Action[] = [
    {
      id: "cbc-1",
      title: "Order CBC Test",
      type: "test",
      priority: "urgent",
      status: "pending",
      dueWithin: "24 hours",
      rationale: "Monitor infection markers",
      progress: 0,
      relatedFindings: ["Elevated temperature", "Persistent cough"],
    },
    {
      id: "xray-1",
      title: "Schedule Chest X-ray",
      type: "procedure",
      priority: "high",
      status: "scheduled",
      dueWithin: "48 hours",
      rationale: "Evaluate lung condition",
      progress: 50,
      relatedFindings: ["Persistent cough"],
    },
    {
      id: "med-1",
      title: "Prescribe Medication",
      type: "medication",
      priority: "normal",
      status: "pending",
      dueWithin: "24 hours",
      rationale: "Symptom management",
      progress: 25,
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "test":
        return <FileText className="h-4 w-4" />;
      case "procedure":
        return <Calendar className="h-4 w-4" />;
      case "medication":
        return <Pill className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "warning";
      default:
        return "primary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "scheduled":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-inter font-medium text-gray-800">
            Recommended Actions
          </h3>
          <Chip size="sm" variant="flat" color="primary">
            {actions.length} pending
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getActionIcon(action.type)}
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Due within {action.dueWithin}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Chip
                    size="sm"
                    color={getPriorityColor(action.priority)}
                    variant="flat"
                  >
                    {action.priority}
                  </Chip>
                  <Chip
                    size="sm"
                    color={getStatusColor(action.status)}
                    variant="flat"
                  >
                    {action.status}
                  </Chip>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">{action.rationale}</p>

                {action.relatedFindings && (
                  <div className="flex flex-wrap gap-1">
                    {action.relatedFindings.map((finding, i) => (
                      <Chip key={i} size="sm" variant="flat">
                        {finding}
                      </Chip>
                    ))}
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{action.progress}%</span>
                  </div>
                  <Progress
                    value={action.progress}
                    color={action.progress === 100 ? "success" : "primary"}
                    size="sm"
                  />
                </div>

                <Button
                  size="sm"
                  color={getPriorityColor(action.priority)}
                  variant="flat"
                  className="w-full"
                  endContent={<ChevronRight className="h-4 w-4" />}
                >
                  Take Action
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecommendedActions;
