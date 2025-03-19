import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Chip,
} from "@nextui-org/react";
import {
  Download,
  Filter,
  Search,
  FileText,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import ReportPreviewModal from "../components/reports/ReportPreviewModal";
// import { exportReport } from "../utils/reportExport";
import GenerateReportModal from "../components/reports/GenerateReportModal";

const Reports = () => {
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );
  const [reportType, setReportType] = useState<
    "all" | "clinical" | "financial"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv" | "excel">(
    "pdf"
  );
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);

  const reportsData = [
    {
      id: "REP001",
      title: "Monthly Patient Statistics",
      type: "clinical",
      generated: "2024-03-15",
      status: "ready",
      size: "2.4 MB",
    },
    {
      id: "REP002",
      title: "Financial Summary Q1",
      type: "financial",
      generated: "2024-03-14",
      status: "processing",
      size: "1.8 MB",
    },
    {
      id: "REP003",
      title: "Patient Analysis Report",
      type: "clinical",
      generated: "2024-03-13",
      status: "ready",
      size: "1.2 MB",
    },
    {
      id: "REP004",
      title: "Financial Summary Q2",
      type: "financial",
      generated: "2024-03-12",
      status: "ready",
      size: "1.5 MB",
    },
    // Add more sample reports
  ];

  const chartData = [
    { month: "Jan", reports: 65, downloads: 45 },
    { month: "Feb", reports: 75, downloads: 55 },
    { month: "Mar", reports: 85, downloads: 65 },
    { month: "Apr", reports: 95, downloads: 75 },
    { month: "May", reports: 105, downloads: 85 },
    { month: "Jun", reports: 115, downloads: 95 },
    { month: "Jul", reports: 125, downloads: 105 },
    { month: "Aug", reports: 135, downloads: 115 },
    { month: "Sep", reports: 145, downloads: 125 },
    { month: "Oct", reports: 155, downloads: 135 },
    { month: "Nov", reports: 165, downloads: 145 },
    { month: "Dec", reports: 175, downloads: 155 },
  ];

  const filteredReports = useMemo(() => {
    return reportsData.filter((report) => {
      const matchesSearch = report.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType = reportType === "all" || report.type === reportType;
      return matchesSearch && matchesType;
    });
  }, [reportsData, searchQuery, reportType]);

  const handleDownload = (reportId: string) => {
    const report = reportsData.find((r) => r.id === reportId);
    console.log(`Downloading report: ${report?.title}`);
  };

  const handlePreview = (reportId: string) => {
    setSelectedReport(reportId);
    setPreviewModalOpen(true);
  };

  const handleExport = (format: "pdf" | "csv" | "excel") => {
    setExportFormat(format);
    const dataToExport = filteredReports.map((report) => ({
      Title: report.title,
      Type: report.type,
      Generated: report.generated,
      Status: report.status,
      Size: report.size,
    }));

    // exportReport({
    //   title: `Reports_${new Date().toISOString().split("T")[0]}`,
    //   data: dataToExport,
    //   format,
    // });
  };

  const handleGenerateReport = (reportData: any) => {
    console.log("Generating report with data:", reportData);
    // Add report generation logic here
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            Generate and manage clinical reports
          </p>
        </div>
        <Button
          color="primary"
          startContent={<FileText className="w-4 h-4" />}
          onClick={() => setGenerateModalOpen(true)}
        >
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">248</p>
                <p className="text-xs text-gray-500 mt-1">
                  ↑ 12% from last month
                </p>
              </div>
              <div className="p-2 bg-blue-200 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl font-bold text-green-600 mt-1">1,856</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="p-2 bg-green-200 rounded-lg">
                <Download className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Clinical Reports</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">156</p>
                <p className="text-xs text-gray-500 mt-1">Active reports</p>
              </div>
              <div className="p-2 bg-purple-200 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Analytics</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">24</p>
                <p className="text-xs text-gray-500 mt-1">Custom reports</p>
              </div>
              <div className="p-2 bg-orange-200 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="flex justify-between">
            <h3 className="text-lg font-semibold">Report Generation Trends</h3>
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
                color={timeRange === "yearly" ? "primary" : "default"}
                onClick={() => setTimeRange("yearly")}
                className="cursor-pointer"
              >
                Yearly
              </Chip>
            </div>
          </CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="reports"
                  fill="#3b82f6"
                  name="Reports Generated"
                />
                <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="flat"
                startContent={<FileText className="w-4 h-4" />}
              >
                Clinical Summary
              </Button>
              <Button
                className="w-full justify-start"
                variant="flat"
                startContent={<TrendingUp className="w-4 h-4" />}
              >
                Analytics Report
              </Button>
              <Button
                className="w-full justify-start"
                variant="flat"
                startContent={<Calendar className="w-4 h-4" />}
              >
                Schedule Report
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between">
          <h3 className="text-lg font-semibold">Recent Reports</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="max-w-xs"
            />
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Filter className="w-4 h-4" />}
                >
                  Type: {reportType}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                selectedKeys={[reportType]}
                onSelectionChange={(keys) =>
                  setReportType(Array.from(keys)[0] as any)
                }
              >
                <DropdownItem key="all">All Reports</DropdownItem>
                <DropdownItem key="clinical">Clinical</DropdownItem>
                <DropdownItem key="financial">Financial</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  startContent={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="pdf" onClick={() => handleExport("pdf")}>
                  Export as PDF
                </DropdownItem>
                <DropdownItem key="csv" onClick={() => handleExport("csv")}>
                  Export as CSV
                </DropdownItem>
                <DropdownItem key="excel" onClick={() => handleExport("excel")}>
                  Export as Excel
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody>
          <Table aria-label="Reports table">
            <TableHeader>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>GENERATED</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>SIZE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={
                        report.type === "clinical" ? "primary" : "secondary"
                      }
                    >
                      {report.type}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    {new Date(report.generated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={report.status === "ready" ? "success" : "warning"}
                    >
                      {report.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        startContent={<FileText className="w-4 h-4" />}
                        onClick={() => handlePreview(report.id)}
                      >
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        startContent={<Download className="w-4 h-4" />}
                        onClick={() => handleDownload(report.id)}
                      >
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      {/* <ReportPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        report={reportsData.find((r) => r.id === selectedReport)}
      /> */}
      <GenerateReportModal
        isOpen={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
};

export default Reports;
