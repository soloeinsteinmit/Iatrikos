import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import {
  Calendar,
  Filter,
  MoreVertical,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routeConstants";

interface TreatmentPlan {
  id: string;
  patientName: string;
  condition: string;
  startDate: string;
  duration: string;
  progress: number;
  status: "active" | "completed" | "pending";
  priority: "high" | "medium" | "low";
}

const Treatment = () => {
  const [timeRange, setTimeRange] = useState<"all" | "active" | "completed">(
    "all"
  );
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(new Set(["all"]));
  const [priorityFilter, setPriorityFilter] = useState(new Set(["all"]));

  const treatmentPlans: TreatmentPlan[] = [
    {
      id: "TP001",
      patientName: "John Doe",
      condition: "Hypertension",
      startDate: "2024-03-15",
      duration: "3 months",
      progress: 65,
      status: "active",
      priority: "high",
    },
    {
      id: "TP002",
      patientName: "Jane Doe",
      condition: "Diabetes",
      startDate: "2024-03-15",
      duration: "3 months",
      progress: 65,
      status: "active",
      priority: "high",
    },
    {
      id: "TP003",
      patientName: "John Doe",
      condition: "Hypertension",
      startDate: "2024-03-15",
      duration: "3 months",
      progress: 65,
      status: "completed",
      priority: "low",
    },
    {
      id: "TP004",
      patientName: "Jane Doe",
      condition: "Diabetes",
      startDate: "2024-03-15",
      duration: "3 months",
      progress: 65,
      status: "completed",
      priority: "low",
    },
    // Add more sample data
  ];

  const filteredTreatments = useMemo(() => {
    let filtered = [...treatmentPlans];

    if (filterValue) {
      filtered = filtered.filter(
        (plan) =>
          plan.patientName.toLowerCase().includes(filterValue.toLowerCase()) ||
          plan.condition.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter.size > 0 && !statusFilter.has("all")) {
      filtered = filtered.filter((plan) => statusFilter.has(plan.status));
    }

    if (priorityFilter.size > 0 && !priorityFilter.has("all")) {
      filtered = filtered.filter((plan) => priorityFilter.has(plan.priority));
    }

    return filtered;
  }, [treatmentPlans, filterValue, statusFilter, priorityFilter]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Treatment Plans</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and monitor patient treatments
          </p>
        </div>
        <Button
          color="primary"
          onClick={() => navigate(ROUTES.TREATMENTS.NEW)}
          startContent={<Plus className="w-4 h-4" />}
        >
          New Treatment Plan
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4 mb-4">
        <Input
          placeholder="Search treatments..."
          value={filterValue}
          onValueChange={setFilterValue}
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
              selectionMode="single"
              selectedKeys={statusFilter}
              onSelectionChange={(keys) => setStatusFilter(keys as Set<string>)}
            >
              <DropdownItem key="all">All Status</DropdownItem>
              <DropdownItem key="active">Active</DropdownItem>
              <DropdownItem key="completed">Completed</DropdownItem>
              <DropdownItem key="pending">Pending</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                startContent={<AlertTriangle className="w-4 h-4" />}
              >
                Priority: {Array.from(priorityFilter)[0]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={priorityFilter}
              onSelectionChange={(keys) =>
                setPriorityFilter(keys as Set<string>)
              }
            >
              <DropdownItem key="all">All Priorities</DropdownItem>
              <DropdownItem key="high">High</DropdownItem>
              <DropdownItem key="medium">Medium</DropdownItem>
              <DropdownItem key="low">Low</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Active Treatments</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">24</p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 8% from last month
                </p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">156</p>
                <p className="text-xs text-gray-500 mt-1">This year</p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">8</p>
                <p className="text-xs text-gray-500 mt-1">Require attention</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">92%</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <Progress
                size="sm"
                radius="sm"
                value={92}
                className="max-w-md mt-2"
                color="secondary"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between">
          <h3 className="text-lg font-semibold">Active Treatment Plans</h3>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Filter: {timeRange}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={[timeRange]}
                onSelectionChange={(keys) =>
                  setTimeRange(Array.from(keys)[0] as any)
                }
              >
                <DropdownItem key="all">All Plans</DropdownItem>
                <DropdownItem key="active">Active Only</DropdownItem>
                <DropdownItem key="completed">Completed</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Treatment plans table">
            <TableHeader>
              <TableColumn>PATIENT</TableColumn>
              <TableColumn>CONDITION</TableColumn>
              <TableColumn>START DATE</TableColumn>
              <TableColumn>DURATION</TableColumn>
              <TableColumn>PROGRESS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {treatmentPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.patientName}</TableCell>
                  <TableCell>{plan.condition}</TableCell>
                  <TableCell>
                    {new Date(plan.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{plan.duration}</TableCell>
                  <TableCell>
                    <Progress value={plan.progress} className="max-w-md" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        plan.status === "active"
                          ? "primary"
                          : plan.status === "completed"
                          ? "success"
                          : "warning"
                      }
                      size="sm"
                    >
                      {plan.status}
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
                        <DropdownItem>Edit Plan</DropdownItem>
                        <DropdownItem>Progress Notes</DropdownItem>
                        <DropdownItem className="text-danger">
                          Discontinue
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Treatment;
