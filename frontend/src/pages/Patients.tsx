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
} from "@nextui-org/react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();

  // Sample data - replace with real data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      lastVisit: "2024-03-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 58,
      gender: "Male",
      lastVisit: "2024-02-28",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Patients</h1>
        <Button
          color="primary"
          onClick={() => navigate("/patients/new")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Patient
        </Button>
      </div>

      <div className="flex justify-end">
        <Input
          placeholder="Search patients..."
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="max-w-xs"
        />
      </div>

      <Table aria-label="Patients table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>AGE</TableColumn>
          <TableColumn>GENDER</TableColumn>
          <TableColumn>LAST VISIT</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="cursor-pointer hover:bg-gray-50"
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    patient.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {patient.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;
