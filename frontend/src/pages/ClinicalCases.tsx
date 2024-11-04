import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
} from "@nextui-org/react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClinicalCases = () => {
  const navigate = useNavigate();

  // Sample data - replace with real data
  const cases = [
    {
      id: 1,
      patient: "John Doe",
      condition: "Hypertension",
      startDate: "2024-03-01",
      status: "Active",
      priority: "High",
    },
    {
      id: 2,
      patient: "Jane Smith",
      condition: "Type 2 Diabetes",
      startDate: "2024-02-15",
      status: "Active",
      priority: "Medium",
    },
    {
      id: 3,
      patient: "Bob Johnson",
      condition: "Arthritis",
      startDate: "2024-01-20",
      status: "Resolved",
      priority: "Low",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clinical Cases</h1>
        <Button
          color="primary"
          onClick={() => navigate("/cases/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Case
        </Button>
      </div>

      <div className="flex justify-end">
        <Input
          placeholder="Search cases..."
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="max-w-xs"
        />
      </div>

      <Table aria-label="Clinical cases table">
        <TableHeader>
          <TableColumn>PATIENT</TableColumn>
          <TableColumn>CONDITION</TableColumn>
          <TableColumn>START DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PRIORITY</TableColumn>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow
              key={case_.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell>{case_.patient}</TableCell>
              <TableCell>{case_.condition}</TableCell>
              <TableCell>{case_.startDate}</TableCell>
              <TableCell>
                <Chip
                  color={case_.status === "Active" ? "success" : "default"}
                  variant="flat"
                >
                  {case_.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip color={getPriorityColor(case_.priority)} variant="flat">
                  {case_.priority}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClinicalCases;
