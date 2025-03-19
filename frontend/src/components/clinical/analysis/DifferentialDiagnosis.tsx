import React from "react";
import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";
import { BookOpen, ChevronRight } from "lucide-react";

interface Diagnosis {
  condition: string;
  probability: number;
  evidence: string[];
  contradictions: string[];
  literature: string[];
}

export const DifferentialDiagnosis: React.FC = () => {
  const diagnoses: Diagnosis[] = [
    {
      condition: "Community Acquired Pneumonia",
      probability: 85,
      evidence: ["Fever", "Productive cough", "Chest pain"],
      contradictions: ["Normal oxygen saturation"],
      literature: [
        "PubMed ID: 12345",
        "NEJM Article: Pneumonia Guidelines 2024",
      ],
    },
    {
      condition: "Acute Bronchitis",
      probability: 65,
      evidence: ["Cough", "Fatigue"],
      contradictions: ["High fever"],
      literature: ["CDC Guidelines 2024", "BMJ Review"],
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeader>
        <h3 className="text-xl font-semibold">Differential Diagnosis</h3>
      </CardHeader>
      <CardBody>
        {diagnoses.map((diagnosis, index) => (
          <Card key={index} className="mb-4 border-1 shadow-sm">
            <CardBody className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium">{diagnosis.condition}</h4>
                <Chip
                  color={diagnosis.probability > 80 ? "success" : "warning"}
                  variant="flat"
                >
                  {diagnosis.probability}% Probability
                </Chip>
              </div>

              <div className="space-y-2">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">
                    Supporting Evidence
                  </h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {diagnosis.evidence.map((item, i) => (
                      <Chip key={i} size="sm" variant="flat" color="success">
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700">
                    Contradicting Factors
                  </h5>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {diagnosis.contradictions.map((item, i) => (
                      <Chip key={i} size="sm" variant="flat" color="danger">
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Medical Literature
                  </h5>
                  {diagnosis.literature.map((item, i) => (
                    <Button
                      key={i}
                      variant="light"
                      size="sm"
                      className="w-full justify-between mb-1"
                      endContent={<ChevronRight className="h-4 w-4" />}
                      startContent={<BookOpen className="h-4 w-4" />}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </div>
  );
};
