import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";

type TreatmentFormData = {
  patientName: string;
  condition: string;
  startDate: Date | null;
  duration: string;
  priority: string;
  notes: string;
  vitalsToMonitor: string[];
};

const NewTreatmentPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TreatmentFormData>({
    patientName: "",
    condition: "",
    startDate: null,
    duration: "",
    priority: "",
    notes: "",
    vitalsToMonitor: [],
  });

  const handleInputChange = (field: keyof TreatmentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    navigate(ROUTES.TREATMENTS.ROOT);
  };

  const handleAddVital = (value: string) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        vitalsToMonitor: [...prev.vitalsToMonitor, value.trim()],
      }));
    }
  };

  const handleRemoveVital = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      vitalsToMonitor: prev.vitalsToMonitor.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="light"
          onClick={() => navigate(ROUTES.TREATMENTS.ROOT)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-5">
          <CardHeader>
            <h1 className="text-2xl font-bold ">New Treatment Plan</h1>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Patient Name"
                  value={formData.patientName}
                  onValueChange={(value) =>
                    handleInputChange("patientName", value)
                  }
                  isRequired
                />
                <Input
                  label="Condition"
                  value={formData.condition}
                  onValueChange={(value) =>
                    handleInputChange("condition", value)
                  }
                  isRequired
                />
              </div>
            </div>

            {/* Treatment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Treatment Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  value={formData.startDate}
                  onValueChange={(date) => handleInputChange("startDate", date)}
                  isRequired
                />
                <Input
                  label="Duration"
                  value={formData.duration}
                  onValueChange={(value) =>
                    handleInputChange("duration", value)
                  }
                  placeholder="e.g., 3 months"
                  isRequired
                />
              </div>
              <Select
                label="Priority"
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                isRequired
              >
                <SelectItem key="high" value="high">
                  High
                </SelectItem>
                <SelectItem key="medium" value="medium">
                  Medium
                </SelectItem>
                <SelectItem key="low" value="low">
                  Low
                </SelectItem>
              </Select>
            </div>

            {/* Goals and Monitoring */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Goals & Monitoring</h3>
              <div className="space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {formData.vitalsToMonitor.map((vital, index) => (
                    <Chip key={index} onClose={() => handleRemoveVital(index)}>
                      {vital}
                    </Chip>
                  ))}
                </div>
                <Input
                  label="Add Vital to Monitor"
                  placeholder="e.g., Blood Pressure"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      handleAddVital(input.value);
                      input.value = "";
                    }
                  }}
                />
              </div>
            </div>

            {/* Notes */}
            <Textarea
              label="Treatment Notes"
              value={formData.notes}
              onValueChange={(value) => handleInputChange("notes", value)}
              minRows={3}
            />
          </CardBody>
        </Card>

        <div className="flex justify-end gap-2">
          <Button
            variant="flat"
            color="danger"
            onClick={() => navigate(ROUTES.TREATMENTS.ROOT)}
          >
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create Treatment Plan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTreatmentPlan;
