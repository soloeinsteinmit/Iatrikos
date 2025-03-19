import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { AlertCircle, Clock, Link as LinkIcon } from "lucide-react";

interface Finding {
  description: string;
  severity: "critical" | "moderate" | "low";
  timestamp: string;
  category: "vital" | "symptom" | "history";
  relatedEvidence?: string;
}

const KeyFindings: React.FC = () => {
  const findings: Finding[] = [
    {
      description: "Elevated temperature (38.5°C)",
      severity: "moderate",
      timestamp: "2024-03-15 14:30",
      category: "vital",
      relatedEvidence: "Trending upward over last 6 hours",
    },
    {
      description: "Persistent cough for 5 days",
      severity: "critical",
      timestamp: "2024-03-15 14:30",
      category: "symptom",
      relatedEvidence: "Worsening at night",
    },
    {
      description: "History of seasonal allergies",
      severity: "low",
      timestamp: "2024-03-15 14:30",
      category: "history",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "danger";
      case "moderate":
        return "warning";
      default:
        return "success";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "vital":
        return "Vital Signs";
      case "symptom":
        return "Symptoms";
      case "history":
        return "Medical History";
      default:
        return category;
    }
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-inter font-medium text-gray-800">Key Findings</h3>
          <Chip size="sm" variant="flat" color="primary">
            {findings.length} findings
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {Object.entries(
            findings.reduce((acc, finding) => {
              const category = finding.category;
              if (!acc[category]) acc[category] = [];
              acc[category].push(finding);
              return acc;
            }, {} as Record<string, Finding[]>)
          ).map(([category, categoryFindings]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">
                {getCategoryLabel(category)}
              </h4>
              {categoryFindings.map((finding, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg"
                >
                  <AlertCircle
                    size={16}
                    className={`mt-0.5 ${
                      finding.severity === "critical"
                        ? "text-red-500"
                        : finding.severity === "moderate"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-600">
                        {finding.description}
                      </p>
                      <Chip
                        size="sm"
                        color={getSeverityColor(finding.severity)}
                        variant="flat"
                      >
                        {finding.severity}
                      </Chip>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {finding.timestamp}
                      {finding.relatedEvidence && (
                        <>
                          <LinkIcon size={12} />
                          <span>{finding.relatedEvidence}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default KeyFindings;
