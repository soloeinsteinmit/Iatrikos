import React from "react";
import { Avatar } from "@nextui-org/react";
import { Bot, Clock } from "lucide-react";

interface Analysis {
  diagnoses?: {
    condition: string;
    confidence: string;
  }[];
  recommendations?: string[];
  findings?: string[];
}

interface ClinicalAnalysisMessageProps {
  title: string;
  analysis: Analysis;
  timestamp: string;
}

const ClinicalAnalysisMessage: React.FC<ClinicalAnalysisMessageProps> = ({
  title,
  analysis,
  timestamp,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <Avatar icon={<Bot size={20} />} className="bg-blue-100 text-blue-600" />
      <div className="flex-1">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">{title}</h4>
          <div className="space-y-3">
            {analysis.diagnoses && (
              <div>
                <h5 className="text-sm font-medium text-blue-700">
                  Potential Diagnoses:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {analysis.diagnoses.map((diagnosis, index) => (
                    <li key={index}>
                      {diagnosis.condition} ({diagnosis.confidence})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.recommendations && (
              <div>
                <h5 className="text-sm font-medium text-blue-700">
                  Recommended Tests:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.findings && (
              <div>
                <h5 className="text-sm font-medium text-blue-700">
                  Key Findings:
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {analysis.findings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1 flex items-center">
          <Clock size={12} className="mr-1" /> {timestamp}
        </span>
      </div>
    </div>
  );
};

export default ClinicalAnalysisMessage;
