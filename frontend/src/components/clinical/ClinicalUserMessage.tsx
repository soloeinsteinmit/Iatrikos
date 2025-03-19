import React from "react";
import { Avatar } from "@nextui-org/react";
import { Clock, Stethoscope } from "lucide-react";

interface ClinicalUserMessageProps {
  content: string | React.ReactNode;
  timestamp: string;
  clinicianName?: string;
  role?: string;
}

const ClinicalUserMessage: React.FC<ClinicalUserMessageProps> = ({
  content,
  timestamp,
  clinicianName = "Dr. Smith",
  role = "Primary Care Physician",
}) => {
  return (
    <div className="flex items-start space-x-3 justify-end">
      <div className="flex-1">
        <div className="flex flex-col items-end ">
          <span className="text-xs text-gray-600 mb-1">
            {clinicianName} • {role}
          </span>
          <div className="bg-blue-50 rounded-lg p-3 max-w-[90%]">
            <p className="text-sm text-gray-800 font-outfit">{content}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1 flex items-center">
            <Clock size={12} className="mr-1" /> {timestamp}
          </span>
        </div>
      </div>
      <Avatar
        icon={<Stethoscope size={20} />}
        className="bg-blue-100 text-blue-600"
      />
    </div>
  );
};

export default ClinicalUserMessage;
