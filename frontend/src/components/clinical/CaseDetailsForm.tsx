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
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CaseDetailsFormProps {
  onAnalyze: () => void;
}

const CaseDetailsForm: React.FC<CaseDetailsFormProps> = ({ onAnalyze }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isAdditionalMetricsOpen, setIsAdditionalMetricsOpen] = useState(false);

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

          <Input
            label="Chief Complaint"
            labelPlacement="outside"
            isRequired
            placeholder="Enter the primary complaint"
            className="w-full"
            aria-label="Chief Complaint"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Symptoms <span className="text-red-500">*</span>
            </label>
            <SymptomsList />
            <Textarea
              labelPlacement="outside"
              isRequired
              placeholder="Describe the symptoms in detail..."
              className="w-full mt-2"
              minRows={3}
              aria-label="Symptoms"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Essential Vital Signs <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input
                isRequired
                placeholder="Blood Pressure"
                aria-label="Blood Pressure"
              />
              <Input
                isRequired
                placeholder="Heart Rate (BPM)"
                aria-label="Heart Rate (BPM)"
              />
              <Input
                isRequired
                placeholder="Temperature"
                aria-label="Temperature"
              />
              <Input isRequired placeholder="SpO2 %" aria-label="SpO2 %" />
            </div>
          </div>

          <Textarea
            label="Current Medications"
            labelPlacement="outside"
            isRequired
            placeholder="List current medications with dosages..."
            className="w-full"
            minRows={2}
            aria-label="Current Medications"
          />

          <Textarea
            label="Allergies"
            labelPlacement="outside"
            isRequired
            placeholder="List any known allergies..."
            className="w-full"
            minRows={2}
            aria-label="Allergies"
          />

          <div className="border rounded-lg">
            <button
              onClick={() =>
                setIsAdditionalMetricsOpen(!isAdditionalMetricsOpen)
              }
              className="w-full p-4 flex items-center justify-between text-left text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>Additional Clinical Metrics</span>
              {isAdditionalMetricsOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>

            <AnimatePresence>
              {isAdditionalMetricsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Vital Signs
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Weight (kg)"
                          aria-label="Weight (kg)"
                        />
                        <Input
                          placeholder="Height (cm)"
                          aria-label="Height (cm)"
                        />
                        <Input placeholder="BMI" aria-label="BMI" />
                        <Input
                          placeholder="Respiratory Rate"
                          aria-label="Respiratory Rate"
                        />
                      </div>
                    </div>

                    <Textarea
                      label="Physical Examination Findings"
                      placeholder="Document relevant physical examination findings..."
                      className="w-full"
                      minRows={3}
                      aria-label="Physical Examination Findings"
                    />

                    <Textarea
                      label="Recent Lab Results"
                      placeholder="Include any relevant recent laboratory results..."
                      className="w-full"
                      minRows={2}
                      aria-label="Recent Lab Results"
                    />

                    <Textarea
                      label="Family History"
                      placeholder="Note relevant family medical history..."
                      className="w-full"
                      minRows={2}
                      aria-label="Family History"
                    />

                    <Textarea
                      label="Social History"
                      placeholder="Include relevant social history..."
                      className="w-full"
                      minRows={2}
                      aria-label="Social History"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="flat"
              className="font-dmsans"
              aria-label="Save Draft"
            >
              Save Draft
            </Button>
            <Button
              color="primary"
              className="font-dmsans"
              onClick={handleAnalyze}
              aria-label="Analyze with Agent"
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
