import { Card, CardBody, Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnalysisStatus from "../components/clinical/analysis/AnalysisStatus";
import DiagnosisConfidence from "../components/clinical/analysis/DiagnosisConfidence";
import KeyFindings from "../components/clinical/analysis/KeyFindings";
import { DifferentialDiagnosis } from "../components/clinical/analysis/DifferentialDiagnosis";
import { VitalsTrends } from "../components/clinical/analysis/VitalsTrends";
import { MedicationAnalysis } from "../components/clinical/analysis/MedicationAnalysis";
import { RiskAssessment } from "../components/clinical/analysis/RiskAssessment";
import { LabInterpretation } from "../components/clinical/analysis/LabInterpretation";
import RecommendedActions from "../components/clinical/analysis/RecommendedActions";

const CaseAnalysis = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="light"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-2">
          <CardBody>
            <AnalysisStatus />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <DiagnosisConfidence />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <KeyFindings />
          </CardBody>
        </Card>

        <Card className="col-span-2">
          <CardBody>
            <RecommendedActions />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <DifferentialDiagnosis />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <VitalsTrends />
          </CardBody>
        </Card>

        <Card className="col-span-2">
          <CardBody>
            <MedicationAnalysis />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <RiskAssessment />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <LabInterpretation />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default CaseAnalysis;
