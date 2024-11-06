import {
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  TrendingUp,
  Users,
  Calendar,
  MoreVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  // Sample data - replace with real data
  const patientData = [
    { month: "Jan", patients: 65 },
    { month: "Feb", patients: 85 },
    { month: "Mar", patients: 73 },
    { month: "Apr", patients: 92 },
    { month: "May", patients: 78 },
    { month: "Jun", patients: 95 },
  ];

  const statsCards = [
    {
      title: "Total Patients",
      value: "1,284",
      change: "+12.5%",
      isIncrease: true,
      icon: Users,
    },
    {
      title: "New Cases",
      value: "284",
      change: "+8.2%",
      isIncrease: true,
      icon: TrendingUp,
    },
    {
      title: "Appointments",
      value: "432",
      change: "-3.1%",
      isIncrease: false,
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor your practice performance
          </p>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="flat">Last 30 Days</Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Last 7 Days</DropdownItem>
            <DropdownItem>Last 30 Days</DropdownItem>
            <DropdownItem>Last 90 Days</DropdownItem>
            <DropdownItem>This Year</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardBody className="flex flex-row items-center justify-between p-6">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-2">
                  <span
                    className={`flex items-center text-sm ${
                      stat.isIncrease ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.isIncrease ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Patient Growth</h3>
              <p className="text-sm text-gray-500">
                Monthly patient acquisition
              </p>
            </div>
            <Button isIconOnly variant="light">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardBody>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="#0070F3"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Cases Overview</h3>
              <p className="text-sm text-gray-500">Monthly case distribution</p>
            </div>
            <Button isIconOnly variant="light">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardBody>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="patients" fill="#0070F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
