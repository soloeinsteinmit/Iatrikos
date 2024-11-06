import React from "react";
import { Card, CardBody, CardHeader, Chip, Progress } from "@nextui-org/react";
import { AlertTriangle, Check, X } from "lucide-react";

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  interactions: string[];
  contraindications: string[];
  adherence: number;
}

export const MedicationAnalysis: React.FC = () => {
  const medications: Medication[] = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      interactions: ["Potassium supplements", "NSAIDs"],
      contraindications: ["History of angioedema"],
      adherence: 85,
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      interactions: ["Alcohol"],
      contraindications: ["Severe kidney disease"],
      adherence: 92,
    },
  ];

  return (
    <div className="space-y-4">
      <CardHeader>
        <h3 className="text-xl font-semibold">Medication Analysis</h3>
      </CardHeader>
      <CardBody>
        {medications.map((med, index) => (
          <Card key={index} className="mb-4 border-1">
            <CardBody className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-medium">{med.name}</h4>
                  <p className="text-sm text-gray-600">
                    {med.dosage} - {med.frequency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Adherence</p>
                  <Progress
                    value={med.adherence}
                    color={med.adherence > 80 ? "success" : "warning"}
                    className="max-w-md"
                  />
                </div>
              </div>

              {med.interactions.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Interactions
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {med.interactions.map((interaction, i) => (
                      <Chip key={i} color="warning" variant="flat" size="sm">
                        {interaction}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {med.contraindications.length > 0 && (
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-1">
                    <X className="h-4 w-4 text-danger" />
                    Contraindications
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {med.contraindications.map((contraindication, i) => (
                      <Chip key={i} color="danger" variant="flat" size="sm">
                        {contraindication}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </div>
  );
};
