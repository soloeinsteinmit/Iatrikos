import React from "react";
import AnalysisStatus from "./AnalysisStatus";
import DiagnosisConfidence from "./DiagnosisConfidence";
import KeyFindings from "./KeyFindings";
import { Tabs, Tab } from "@nextui-org/react";
import SafetyChecksCompleted from "./SafetyChecksCompleted";
import RecommendedActions from "./RecommendedActions";

const AnalysisPanel: React.FC = () => {
  return (
    <div className="space-y-4">
      <AnalysisStatus />
      <DiagnosisConfidence />

      <div className="w-full">
        <Tabs
          aria-label="Analysis options"
          size="sm"
          className="flex flex-wrap w-full"
        >
          <Tab key="safety" title="Safety Checks">
            <SafetyChecksCompleted />
          </Tab>
          <Tab key="findings" title="Key Findings">
            <KeyFindings />
          </Tab>
          <Tab key="actions" title="Recommended Actions">
            <RecommendedActions />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisPanel;
