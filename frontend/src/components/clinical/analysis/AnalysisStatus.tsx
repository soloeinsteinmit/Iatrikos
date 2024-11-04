import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Bot } from "lucide-react";

const AnalysisStatus: React.FC = () => {
  return (
    <Card className="p-4">
      <CardBody>
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-inter font-medium">Agent Analysis</h3>
            <p className="text-sm text-gray-500">Processing case details...</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AnalysisStatus;
