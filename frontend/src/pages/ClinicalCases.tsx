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
} from "@nextui-org/react";
import { Search, Plus, Filter, SortAsc, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClinicalCases = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
          <h1 className="text-2xl font-bold text-gray-800">Clinical Cases</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track patient cases
          </p>
        </div>
        <Button
          color="primary"
          onClick={() => navigate("/cases/new")}
          className="flex items-center gap-2"
          size="md"
        >
          <Plus className="w-4 h-4" />
          New Case
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search cases..."
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
              <DropdownItem>All Cases</DropdownItem>
              <DropdownItem>Active Cases</DropdownItem>
              <DropdownItem>Resolved Cases</DropdownItem>
              <DropdownItem>High Priority</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button variant="flat" startContent={<SortAsc className="w-4 h-4" />}>
            Sort
          </Button>
        </div>
      </div>

      <Table
        aria-label="Clinical cases table"
        bottomContent={
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Total {cases.length} cases
            </span>
            <Pagination
              total={Math.ceil(cases.length / rowsPerPage)}
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
          <TableColumn>CONDITION</TableColumn>
          <TableColumn>START DATE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>PRIORITY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {cases.map((case_) => (
            <TableRow
              key={case_.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => navigate(`/cases/${case_.id}`)}
            >
              <TableCell className="font-medium">{case_.patient}</TableCell>
              <TableCell>{case_.condition}</TableCell>
              <TableCell>{formatDate(case_.startDate)}</TableCell>
              <TableCell>
                <Chip
                  color={case_.status === "Active" ? "success" : "default"}
                  variant="flat"
                  size="sm"
                >
                  {case_.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Chip
                  color={getPriorityColor(case_.priority)}
                  variant="flat"
                  size="sm"
                >
                  {case_.priority}
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
                    <DropdownItem>View Details</DropdownItem>
                    <DropdownItem>Edit Case</DropdownItem>
                    <DropdownItem className="text-danger">
                      Close Case
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

export default ClinicalCases;
