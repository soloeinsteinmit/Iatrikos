import React from "react";

interface CaseTabSelectorProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CaseTabSelector: React.FC<CaseTabSelectorProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange("case")}
        className={`px-4 py-2 font-dmsans rounded-lg transition-colors ${
          activeTab === "case"
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Case Details
      </button>
      <button
        onClick={() => onTabChange("chat")}
        className={`px-4 py-2 font-dmsans rounded-lg transition-colors ${
          activeTab === "chat"
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Agent Chat
      </button>
    </div>
  );
};

export default CaseTabSelector;
