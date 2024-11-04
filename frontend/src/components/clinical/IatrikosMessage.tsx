import React from "react";
import { Avatar } from "@nextui-org/react";
import { Bot, Clock } from "lucide-react";

interface IatrikosMessageProps {
  isBot?: boolean;
  content: string | React.ReactNode;
  timestamp: string;
}

const IatrikosMessage: React.FC<IatrikosMessageProps> = ({
  isBot,
  content,
  timestamp,
}) => {
  return (
    <div className="flex items-start space-x-3">
      <Avatar
        icon={isBot ? <Bot size={20} /> : undefined}
        className={isBot ? "bg-blue-100 text-blue-600" : ""}
      />
      <div className="flex-1">
        <div
          className={`${isBot ? "bg-gray-100" : "bg-blue-50"} rounded-lg p-3`}
        >
          <p className="text-sm text-gray-800 font-outfit">{content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1 flex items-center">
          <Clock size={12} className="mr-1" /> {timestamp}
        </span>
      </div>
    </div>
  );
};

export default IatrikosMessage;
