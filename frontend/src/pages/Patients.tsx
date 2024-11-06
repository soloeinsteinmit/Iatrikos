import { useState } from "react";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Avatar,
} from "@nextui-org/react";
import { Search, Filter, SortAsc, MoreVertical, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Sample data - replace with real data
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-15",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=doctor",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      lastVisit: "2024-03-20",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=doctor",
    },
    {
      id: 3,
      name: "Bob Johnson",
      age: 58,
      gender: "Male",
      lastVisit: "2024-02-28",
      status: "Inactive",
      src: "https://i.pravatar.cc/150?u=doctor",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your patient records
          </p>
        </div>
        <Button
          color="primary"
          onClick={() => navigate("/patients/new")}
          className="flex items-center gap-2"
          size="md"
          startContent={<UserPlus className="w-4 h-4" />}
        >
          New Patient
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search patients..."
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<Filter className="w-4 h-4" />}
              >
                Filter
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter options">
              <DropdownItem>All Patients</DropdownItem>
              <DropdownItem>Active Patients</DropdownItem>
              <DropdownItem>Recent Visits</DropdownItem>
              <DropdownItem>Inactive Patients</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button variant="flat" startContent={<SortAsc className="w-4 h-4" />}>
            Sort
          </Button>
        </div>
      </div>

      <Table
        aria-label="Patients table"
        bottomContent={
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Total {patients.length} patients
            </span>
            <Pagination
              total={Math.ceil(patients.length / rowsPerPage)}
              page={page}
              onChange={setPage}
            />
          </div>
        }
        classNames={{
          wrapper: "shadow-none",
        }}
      >
        <TableHeader>
          <TableColumn>PATIENT</TableColumn>
          <TableColumn>AGE</TableColumn>
          <TableColumn>GENDER</TableColumn>
          <TableColumn>LAST VISIT</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    name={patient.name}
                    size="sm"
                    className="bg-primary/10"
                    src={patient.src}
                  />
                  <span className="font-medium">{patient.name}</span>
                </div>
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{formatDate(patient.lastVisit)}</TableCell>
              <TableCell>
                <Chip
                  color={patient.status === "Active" ? "success" : "default"}
                  variant="flat"
                  size="sm"
                >
                  {patient.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly variant="light" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>View Profile</DropdownItem>
                    <DropdownItem>Edit Details</DropdownItem>
                    <DropdownItem>Medical History</DropdownItem>
                    <DropdownItem className="text-danger">
                      Deactivate
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Patients;
