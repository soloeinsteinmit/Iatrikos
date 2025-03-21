import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Activity, Users, CheckCircle, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import AIPredictiveInsights from "../components/dashboard/AIPredictiveInsights";
import ClinicalMetrics from "../components/dashboard/ClinicalMetrics";

const Dashboard = () => {
  // const patientData = [
  //   { month: "Jan", count: 65 },
  //   { month: "Feb", count: 75 },
  //   { month: "Mar", count: 85 },
  //   { month: "Apr", count: 95 },
  // ];

  const caseData = [
    { month: "Jan", resolved: 40, new: 45, pending: 15 },
    { month: "Feb", resolved: 50, new: 48, pending: 18 },
    { month: "Mar", resolved: 45, new: 52, pending: 20 },
    { month: "Apr", resolved: 55, new: 50, pending: 16 },
  ];

  const caseDistribution = [
    { name: "Urgent", value: 30, color: "#ef4444" },
    { name: "High", value: 25, color: "#f97316" },
    { name: "Medium", value: 30, color: "#3b82f6" },
    { name: "Low", value: 15, color: "#22c55e" },
  ];

  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Dr. Smith</h1>
          <p className="text-gray-500 mt-1">Here's what's happening today</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            Last updated: 5 mins ago
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">320</p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 12% from last month
                </p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-green-600 mt-1">45</p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 8% from last week
                </p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Cases Resolved</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">28</p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 15% from last week
                </p>
              </div>
              <div className="p-2 bg-purple-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Appointments Today</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">12</p>
                <p className="text-xs text-gray-500 mt-1">Next in 30 mins</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ClinicalMetrics />
        </div>
        <div>
          <AIPredictiveInsights />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="flex justify-between">
            <h3 className="font-bold text-lg">Case Analytics</h3>
            <div className="flex gap-2">
              <Chip
                size="sm"
                color={timeRange === "monthly" ? "primary" : "default"}
                onClick={() => setTimeRange("monthly")}
                className="cursor-pointer"
              >
                Monthly
              </Chip>
              <Chip
                size="sm"
                color={timeRange === "weekly" ? "primary" : "default"}
                onClick={() => setTimeRange("weekly")}
                className="cursor-pointer"
              >
                Weekly
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={caseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#f97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-bold text-lg">Case Distribution</h3>
          </CardHeader>
          <CardBody>
            <PieChart width={350} height={300}>
              <Pie
                data={caseDistribution}
                cx={160}
                cy={130}
                innerRadius={100}
                outerRadius={120}
                accentHeight={20}
                paddingAngle={8}
                dataKey="value"
              >
                {caseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-bold text-lg">Resource Utilization</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={[
                { time: "8AM", usage: 30 },
                { time: "10AM", usage: 70 },
                { time: "12PM", usage: 90 },
                { time: "2PM", usage: 85 },
                { time: "4PM", usage: 60 },
              ]}
            >
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#3b82f6"
                fill="#93c5fd"
              />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
