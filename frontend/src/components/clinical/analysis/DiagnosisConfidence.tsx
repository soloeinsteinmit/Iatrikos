import React from "react";
import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";
import { TrendingUp, TrendingDown, Minus, Info, BookOpen } from "lucide-react";

interface Diagnosis {
  name: string;
  confidence: number;
  trend: "increasing" | "decreasing" | "stable";
  supportingEvidence: string[];
  ruleOuts: string[];
  lastUpdated: string;
  references?: string[];
}

const DiagnosisConfidence: React.FC = () => {
  const diagnoses: Diagnosis[] = [
    {
      name: "Upper Respiratory Infection",
      confidence: 85,
      trend: "increasing",
      supportingEvidence: [
        "Elevated temperature",
        "Persistent cough",
        "Nasal congestion",
      ],
      ruleOuts: ["Normal chest X-ray", "No bacterial growth in culture"],
      lastUpdated: "5 minutes ago",
      references: ["Clinical Guidelines 2024", "Recent URI Study"],
    },
    {
      name: "Seasonal Allergies",
      confidence: 60,
      trend: "decreasing",
      supportingEvidence: ["History of allergies", "Nasal symptoms"],
      ruleOuts: ["Fever present", "Systemic symptoms"],
      lastUpdated: "10 minutes ago",
      references: ["Allergy Protocol 2024"],
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "success";
    if (confidence >= 60) return "warning";
    return "danger";
  };

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-inter font-medium text-gray-800">
            Diagnosis Confidence
          </h3>
          <Info className="h-4 w-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-800">
                    {diagnosis.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Updated {diagnosis.lastUpdated}</span>
                    {getTrendIcon(diagnosis.trend)}
                  </div>
                </div>
                <Chip
                  size="sm"
                  color={getConfidenceColor(diagnosis.confidence)}
                  variant="flat"
                >
                  {diagnosis.confidence}% confidence
                </Chip>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full bg-${getConfidenceColor(
                    diagnosis.confidence
                  )}-500`}
                  style={{ width: `${diagnosis.confidence}%` }}
                />
              </div>

              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">
                    Supporting Evidence
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis.supportingEvidence.map((evidence, i) => (
                      <Chip key={i} size="sm" variant="flat">
                        {evidence}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">
                    Rule Outs
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {diagnosis.ruleOuts.map((ruleOut, i) => (
                      <Chip key={i} size="sm" variant="flat" color="danger">
                        {ruleOut}
                      </Chip>
                    ))}
                  </div>
                </div>

                {diagnosis.references && (
                  <div className="pt-2">
                    <h5 className="text-sm font-medium text-gray-700 mb-1">
                      References
                    </h5>
                    {diagnosis.references.map((ref, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="light"
                        className="w-full justify-start"
                        startContent={<BookOpen className="h-4 w-4" />}
                      >
                        {ref}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default DiagnosisConfidence;
