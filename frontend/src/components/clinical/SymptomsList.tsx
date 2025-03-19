import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Chip,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { symptomsList } from "../../utils/symptomsList";

export default function SymptomsList() {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Fever", "Headache"])
  );

  const [symptoms, setSymptoms] = useState(symptomsList);

  const handleClose = (symptomToRemove: string) => {
    setSymptoms(
      symptoms.filter((symptom: string) => symptom !== symptomToRemove)
    );
    const newSelection = new Set(selectedKeys);
    newSelection.delete(symptomToRemove);
    setSelectedKeys(newSelection);

    if (symptoms.length === 1) {
      setSymptoms(symptomsList);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex flex-wrap bg-default-100 rounded-medium p-2 scale-100 transition-all hover:bg-default-200 cursor-pointer">
          {Array.from(selectedKeys).length === 0 ? (
            <span className="text-default-500 text-sm">
              No Symptom(s) selected
            </span>
          ) : (
            <>
              {Array.from(selectedKeys).map((symptom, index) => (
                <Chip
                  key={index}
                  onClose={() => handleClose(symptom.toString())}
                  variant="flat"
                  size="sm"
                  className="m-1"
                  color="primary"
                >
                  {symptom.toString().replace(/_/g, " ")}
                </Chip>
              ))}
            </>
          )}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {symptomsList.map((symptom) => (
          <DropdownItem key={symptom}>
            {symptom.replace(/_/g, " ")}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
