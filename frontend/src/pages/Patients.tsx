import { useState, useMemo } from "react";
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
  CardBody,
  Card,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DateRangePicker,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Download,
  UserMinus,
  Mail,
  Users,
  Printer,
  Upload,
  Activity,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  lastVisit: string;
  status: "Active" | "Inactive";
  src: string;
  email?: string;
  phone?: string;
}

interface SortDescriptor {
  column: keyof Patient | string;
  direction: "ascending" | "descending";
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface AdvancedFilters {
  ageRange: {
    min: string;
    max: string;
  };
  dateRange: RangeValue<DateValue> | null;
  gender: Set<string>;
}

const Patients = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const [statusFilter, setStatusFilter] = useState<Set<string>>(
    new Set(["all"])
  );
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "lastVisit",
    direction: "descending",
  });

  const rowsPerPage = 10;

  const patients: Patient[] = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-15",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a04k2ll",
      email: "john.doe@example.com",
      phone: "+1 234-567-8901",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      gender: "Female",
      lastVisit: "2024-03-10",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a042581",
      email: "jane.smith@example.com",
      phone: "+1 234-567-8902",
    },
    {
      id: 3,
      name: "Alice Johnson",
      age: 28,
      gender: "Female",
      lastVisit: "2024-03-05",
      status: "Inactive",
      src: "https://i.pravatar.cc/150?u=a042585",
      email: "alice.johnson@example.com",
      phone: "+1 234-567-8903",
    },
    {
      id: 4,
      name: "Bob Brown",
      age: 55,
      gender: "Male",
      lastVisit: "2024-03-01",
      status: "Inactive",
      src: "https://i.pravatar.cc/150?u=a042591f",
      email: "bob.brown@example.com",
      phone: "+1 234-567-8904",
    },
    {
      id: 5,
      name: "Charlie Davis",
      age: 37,
      gender: "Male",
      lastVisit: "2024-02-20",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a042781f",
      email: "charlie.davis@example.com",
      phone: "+1 234-567-8905",
    },
    {
      id: 6,
      name: "Diana White",
      age: 29,
      gender: "Female",
      lastVisit: "2024-02-15",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a045581f",
      email: "diana.white@example.com",
      phone: "+1 234-567-8906",
    },
    {
      id: 7,
      name: "Eve Green",
      age: 34,
      gender: "Female",
      lastVisit: "2024-02-10",
      status: "Inactive",
      src: "https://i.pravatar.cc/150?u=a032581f",
      email: "eve.green@example.com",
      phone: "+1 234-567-8907",
    },
    {
      id: 8,
      name: "Frank Miller",
      age: 42,
      gender: "Male",
      lastVisit: "2024-02-05",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a212581f",
      email: "frank.miller@example.com",
      phone: "+1 234-567-8908",
    },
    {
      id: 9,
      name: "Grace Wilson",
      age: 27,
      gender: "Female",
      lastVisit: "2024-02-01",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a012571f",
      email: "grace.wilson@example.com",
      phone: "+1 234-567-8909",
    },
    {
      id: 10,
      name: "Hank Hill",
      age: 48,
      gender: "Male",
      lastVisit: "2024-01-25",
      status: "Active",
      src: "https://i.pravatar.cc/150?u=a012561f",
      email: "hank.hill@example.com",
      phone: "+1 234-567-8910",
    },
    {
      id: 11,
      name: "Irene Smith",
      age: 31,
      gender: "Female",
      lastVisit: "2024-01-20",
      status: "Inactive",
      src: "https://i.pravatar.cc/150?u=a012551f",
      email: "irene.smith@example.com",
      phone: "+1 234-567-8911",
    },
    // ... other patient data
  ];

  let filteredPatients = useMemo(() => {
    let filtered = [...patients];

    if (filterValue) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          patient.email?.toLowerCase().includes(filterValue.toLowerCase()) ||
          patient.phone?.includes(filterValue)
      );
    }

    if (statusFilter.size > 0 && !statusFilter.has("all")) {
      filtered = filtered.filter((patient) =>
        statusFilter.has(patient.status.toLowerCase())
      );
    }

    return filtered;
  }, [patients, filterValue, statusFilter]);

  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((a, b) => {
      const column = sortDescriptor.column as keyof Patient;
      const first = a[column];
      const second = b[column];

      if (typeof first === "string" && typeof second === "string") {
        const cmp = first.localeCompare(second);
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }

      if (first === second) return 0;
      if (first == null) return -1;
      if (second == null) return 1;

      return sortDescriptor.direction === "descending"
        ? second < first
          ? -1
          : 1
        : first < second
        ? -1
        : 1;
    });
  }, [filteredPatients, sortDescriptor]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedPatients.slice(start, end);
  }, [page, sortedPatients]);

  const onSearchChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    ageRange: { min: "", max: "" },
    dateRange: null,
    gender: new Set(["all"]),
  });

  if (advancedFilters.ageRange.min || advancedFilters.ageRange.max) {
    filteredPatients = filteredPatients.filter((patient) => {
      const min = Number(advancedFilters.ageRange.min) || 0;
      const max = Number(advancedFilters.ageRange.max) || Infinity;
      return patient.age >= min && patient.age <= max;
    });
  }

  if (advancedFilters.dateRange?.start && advancedFilters.dateRange?.end) {
    filteredPatients = filteredPatients.filter((patient) => {
      const visitDate = new Date(patient.lastVisit);
      const start = advancedFilters.dateRange?.start?.toDate(
        getLocalTimeZone()
      );
      const end = advancedFilters.dateRange?.end?.toDate(getLocalTimeZone());

      if (start && end) {
        return visitDate >= start && visitDate <= end;
      }
      return true;
    });
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your patient records
            </p>
          </div>
          <div className="flex gap-3 mb-4">
            <Button
              color="primary"
              onClick={() => navigate("/patients/new")}
              className="flex items-center gap-2"
              size="md"
              startContent={<UserPlus className="w-4 h-4" />}
            >
              New Patient
            </Button>
            <Button
              variant="flat"
              color="primary"
              startContent={<UserPlus className="w-4 h-4" />}
            >
              Quick Add
            </Button>
            <Button
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              Export All
            </Button>
            <Button
              variant="flat"
              startContent={<Upload className="w-4 h-4" />}
            >
              Import
            </Button>
            <Button
              variant="flat"
              startContent={<Printer className="w-4 h-4" />}
            >
              Print List
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardBody>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {patients.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ↑{" "}
                    {Math.round(
                      (patients.filter((p) => p.status === "Active").length /
                        patients.length) *
                        100
                    )}
                    % active
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardBody>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold text-green-600">
                    {
                      patients.filter(
                        (p) =>
                          new Date(p.lastVisit) >
                          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                      ).length
                    }
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardBody>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gender Distribution</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      (patients.filter((p) => p.gender === "Female").length /
                        patients.length) *
                        100
                    )}
                    %
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Female Patients</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardBody>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Patient Age</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      patients.reduce((acc, curr) => acc + curr.age, 0) /
                        patients.length
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Years</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <Input
          placeholder="Search patients..."
          value={filterValue}
          onValueChange={onSearchChange}
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
                Status: {Array.from(statusFilter)[0]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Filter options"
              selectionMode="single"
              selectedKeys={statusFilter}
              onSelectionChange={(keys) => setStatusFilter(keys as Set<string>)}
            >
              <DropdownItem key="all">All Patients</DropdownItem>
              <DropdownItem key="active">Active</DropdownItem>
              <DropdownItem key="inactive">Inactive</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                variant="flat"
                startContent={<Filter className="w-4 h-4" />}
              >
                Advanced Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-semibold block mb-2">
                    Age Range
                  </span>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      label="Min"
                      size="sm"
                      value={advancedFilters.ageRange.min}
                      onChange={(e) =>
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          ageRange: { ...prev.ageRange, min: e.target.value },
                        }))
                      }
                    />
                    <Input
                      type="number"
                      label="Max"
                      size="sm"
                      value={advancedFilters.ageRange.max}
                      onChange={(e) =>
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          ageRange: { ...prev.ageRange, max: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold block mb-2">
                    Last Visit Range
                  </span>
                  <DateRangePicker
                    label="Select date range"
                    className="max-w-full"
                    value={advancedFilters.dateRange}
                    onChange={(range) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        dateRange: range,
                      }))
                    }
                  />
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    onClick={() => {
                      setAdvancedFilters({
                        ageRange: { min: "", max: "" },
                        dateRange: null,
                        gender: new Set(["all"]),
                      });
                    }}
                  >
                    Clear
                  </Button>
                  <Button size="sm" color="primary">
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedKeys.size > 0 && (
        <div className="flex items-center gap-3 py-2 px-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            {selectedKeys.size} patients selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              Export Selected
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              startContent={<UserMinus className="w-4 h-4" />}
            >
              Bulk Deactivate
            </Button>
            <Button
              size="sm"
              variant="flat"
              startContent={<Mail className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </div>
        </div>
      )}

      <Table
        aria-label="Patients table"
        sortDescriptor={{
          column: sortDescriptor.column,
          direction: sortDescriptor.direction,
        }}
        onSortChange={(descriptor) => {
          setSortDescriptor(descriptor as SortDescriptor);
        }}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
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
          <TableColumn key="name" allowsSorting>
            PATIENT
          </TableColumn>
          <TableColumn key="age" allowsSorting>
            AGE
          </TableColumn>
          <TableColumn key="gender" allowsSorting>
            GENDER
          </TableColumn>
          <TableColumn key="lastVisit" allowsSorting>
            LAST VISIT
          </TableColumn>
          <TableColumn key="status" allowsSorting>
            STATUS
          </TableColumn>
          <TableColumn key="actions">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody className="min-h-[400px] bg-red-500">
          {items.map((patient) => (
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
