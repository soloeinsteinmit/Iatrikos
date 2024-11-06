import React from "react";
import { Button, Card, CardBody, Progress, Chip } from "@nextui-org/react";
import {
  ExternalLink,
  AlertCircle,
  Brain,
  Activity,
  Clock,
  Shield,
  FileText,
  BookOpen,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecommendedActions from "./RecommendedActions";

interface QuickAnalysis {
  progress: number;
  timeRemaining: string;
  diagnoses: Array<{
    name: string;
    confidence: number;
    trend: "increasing" | "decreasing" | "stable";
  }>;
  keyFindings: Array<{
    description: string;
    severity: "critical" | "moderate" | "low";
  }>;
  safetyChecks: Array<{ name: string; completed: boolean }>;
}

const AnalysisPanel: React.FC = () => {
  const navigate = useNavigate();

  const analysis: QuickAnalysis = {
    progress: 65,
    timeRemaining: "2 minutes",
    diagnoses: [
      {
        name: "Upper Respiratory Infection",
        confidence: 85,
        trend: "increasing",
      },
      {
        name: "Seasonal Allergies",
        confidence: 60,
        trend: "decreasing",
      },
    ],
    keyFindings: [
      { description: "Elevated temperature (38.5°C)", severity: "moderate" },
      { description: "Persistent cough", severity: "critical" },
    ],
    safetyChecks: [
      { name: "Drug Interactions", completed: true },
      { name: "Allergy Screen", completed: true },
      { name: "Dosage Check", completed: false },
    ],
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Quick Analysis</h3>
        <Button
          color="primary"
          variant="light"
          onClick={() => navigate("/cases/current/analysis")}
          className="flex items-center gap-2"
        >
          <span>Full Analysis</span>
          <ExternalLink size={16} />
        </Button>
      </div>

      <Card className="w-full">
        <CardBody className="py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <div>
                <span className="text-sm font-medium">AI Analysis</span>
                <div className="flex items-center justify-between gap-2">
                  <Progress
                    value={analysis.progress}
                    className="w-48"
                    size="sm"
                  />
                  <span className="text-xs text-gray-500">
                    {analysis.timeRemaining}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardBody className="py-3">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium">Diagnoses</span>
          </div>
          <div className="space-y-2">
            {analysis.diagnoses.map((diagnosis, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{diagnosis.name}</span>
                <div className="flex items-center gap-2">
                  {getTrendIcon(diagnosis.trend)}
                  <Chip size="sm" color="primary">
                    {diagnosis.confidence}%
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardBody className="py-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-warning" />
            <span className="text-sm font-medium">Key Findings</span>
          </div>
          <div className="space-y-2">
            {analysis.keyFindings.map((finding, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {finding.description}
                </span>
                <Chip
                  size="sm"
                  color={finding.severity === "critical" ? "danger" : "warning"}
                  variant="flat"
                >
                  {finding.severity}
                </Chip>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="w-full">
        <CardBody className="py-3">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">Safety Checks</span>
          </div>
          <div className="space-y-2">
            {analysis.safetyChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{check.name}</span>
                <Chip
                  size="sm"
                  color={check.completed ? "success" : "danger"}
                  variant="flat"
                >
                  {check.completed ? "Passed" : "Failed"}
                </Chip>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AnalysisPanel;
