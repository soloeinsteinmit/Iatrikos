import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import PatientInfoCard from "./PatientInfoCard";
import SymptomsList from "./SymptomsList";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

interface CaseDetailsFormProps {
  onAnalyze: () => void;
}

const CaseDetailsForm: React.FC<CaseDetailsFormProps> = ({ onAnalyze }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze();
      navigate("/cases/new");
    }, 35000);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Card className="p-6">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-inter font-semibold text-gray-800">
            New Clinical Case
          </h2>
        </CardHeader>
        <CardBody className="space-y-6">
          <PatientInfoCard onPatientSelect={() => {}} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chief Complaint
            </label>
            <Input
              placeholder="Enter the primary complaint"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms
            </label>
            <SymptomsList />
            <Textarea
              placeholder="Describe the symptoms in detail..."
              className="w-full mt-2"
              minRows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relevant Medical History
            </label>
            <Textarea
              placeholder="Include any relevant medical history..."
              className="w-full"
              minRows={2}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="flat" className="font-dmsans">
              Save Draft
            </Button>
            <Button
              color="primary"
              className="font-dmsans"
              onClick={handleAnalyze}
            >
              Analyze with Agent
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CaseDetailsForm;
