import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { patientsList } from "../../utils/patientsList";
import { User } from "lucide-react";

interface PatientInfoProps {
  onPatientSelect?: (patient: any) => void;
}

const defaultPatient = {
  name: "No Patient Selected",
  id: "--",
  age: "--",
  gender: "--",
  avatarUrl: "",
};

const PatientInfoCard: React.FC<PatientInfoProps> = ({ onPatientSelect }) => {
  const [selectedPatient, setSelectedPatient] = useState(defaultPatient);

  const handleSelectionChange = (patientId: string) => {
    const patient =
      patientsList.find((p) => p.id === patientId) || defaultPatient;
    setSelectedPatient(patient as any);
    if (onPatientSelect) {
      onPatientSelect(patient);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 mb-4">
        {selectedPatient.avatarUrl ? (
          <Avatar src={selectedPatient.avatarUrl} className="w-12 h-12" />
        ) : (
          <Avatar
            icon={<User size={20} />}
            className="w-12 h-12 bg-gray-100 text-gray-600"
          />
        )}
        <div>
          <h3 className="font-inter font-medium">{selectedPatient.name}</h3>
          <p className="text-sm text-gray-500">
            ID: {selectedPatient.id} • Age: {selectedPatient.age} •{" "}
            {selectedPatient.gender}
          </p>
        </div>
      </div>

      <Autocomplete
        defaultItems={patientsList}
        label="List of Patients"
        placeholder="Search a patient"
        className="max-w-xs"
        onSelectionChange={(key) =>
          key && handleSelectionChange(key.toString())
        }
      >
        {(patient) => (
          <AutocompleteItem key={patient.id} textValue={patient.name}>
            <div className="flex items-center gap-2">
              <Avatar
                src={patient.avatarUrl}
                // className="w-6 h-6"
                size="md"
                fallback={<User size={16} />}
              />
              <div className="flex flex-col">
                <span className="text-small">{patient.name}</span>
                <span className="text-tiny text-default-400">
                  ID: {patient.id}
                </span>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default PatientInfoCard;
