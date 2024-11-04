import React, { useState } from "react";
import CaseTabSelector from "../components/clinical/CaseTabSelector";
import CaseDetailsForm from "../components/clinical/CaseDetailsForm";
import ChatInterface from "../components/clinical/ChatInterface";
import AnalysisPanel from "../components/clinical/analysis/AnalysisPanel";

const NewCaseInterface = () => {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("case");

  return (
    <div className="max-w-7xl mx-auto">
      <CaseTabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          {activeTab === "case" ? (
            <CaseDetailsForm onAnalyze={() => setActiveTab("chat")} />
          ) : (
            <ChatInterface
              input={input}
              onInputChange={setInput}
              onSend={() => {
                /* handle send */
              }}
            />
          )}
        </div>

        <div className="lg:col-span-4">
          <AnalysisPanel />
        </div>
      </div>
    </div>
  );
};

export default NewCaseInterface;
