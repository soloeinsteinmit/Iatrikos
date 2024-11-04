import React from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

const RecommendedActions: React.FC = () => {
  const actions = [
    "Order CBC Test",
    "Schedule Chest X-ray",
    "Prescribe Medication",
  ];

  return (
    <Card className="p-4">
      <CardHeader className="pb-2">
        <h3 className="font-inter font-medium text-gray-800">
          Recommended Actions
        </h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="flat"
              color="primary"
              className="w-full justify-start font-dmsans"
            >
              {action}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RecommendedActions;
