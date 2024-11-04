import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  // Sample data - replace with real data
  const patientData = [
    { month: "Jan", count: 65 },
    { month: "Feb", count: 75 },
    { month: "Mar", count: 85 },
    { month: "Apr", count: 95 },
  ];

  const caseData = [
    { month: "Jan", resolved: 40, new: 45 },
    { month: "Feb", resolved: 50, new: 48 },
    { month: "Mar", resolved: 45, new: 52 },
    { month: "Apr", resolved: 55, new: 50 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome back👋, Dr. Smith</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-xl font-semibold">Total Patients</p>
              <p className="text-4xl font-bold text-blue-600">320</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-xl font-semibold">Active Cases</p>
              <p className="text-4xl font-bold text-success">45</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-xl font-semibold">Cases Resolved (MTD)</p>
              <p className="text-4xl font-bold text-purple-600">28</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="font-bold">Patient Growth</CardHeader>
          <CardBody>
            <BarChart width={400} height={300} data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="font-bold">Case Trends</CardHeader>
          <CardBody>
            <LineChart width={400} height={300} data={caseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#3b82f6" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" />
            </LineChart>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
