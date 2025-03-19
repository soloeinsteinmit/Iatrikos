import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DateRangePicker,
  CardFooter,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import { FileText, Download, Search, Eye } from "lucide-react";
import { CSVLink } from "react-csv";

interface Report {
  id: string;
  patientName: string;
  reportType: "summary" | "detailed";
  date: string;
  doctor: string;
  details: string;
}

const MedicalReport = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [reportType, setReportType] = useState<"all" | "summary" | "detailed">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sortField, setSortField] = useState<"patientName" | "date" | "doctor">(
    "date"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [doctorFilter, setDoctorFilter] = useState<string>("");
  const [selectedReports, setSelectedReports] = useState<Set<string>>(
    new Set()
  );
  const [secondarySortField, setSecondarySortField] = useState<
    "patientName" | "date" | "doctor"
  >("patientName");

  const reportsPerPage = 5;
  const medicalReports: Report[] = [
    {
      id: "MR001",
      patientName: "John Doe",
      reportType: "summary",
      date: "2024-03-15",
      doctor: "Dr. Smith",
      details: "Detailed report content for John Doe...",
    },
    {
      id: "MR002",
      patientName: "Jane Smith",
      reportType: "detailed",
      date: "2024-03-14",
      doctor: "Dr. Brown",
      details: "Detailed report content for Jane Smith...",
    },
    {
      id: "MR003",
      patientName: "John Doe",
      reportType: "summary",
      date: "2024-03-15",
      doctor: "Dr. Smith",
      details: "Detailed report content for John Doe...",
    },
    {
      id: "MR004",
      patientName: "Jane Smith",
      reportType: "detailed",
      date: "2024-03-14",
      doctor: "Dr. Brown",
      details: "Detailed report content for Jane Smith...",
    },
    // Add more sample reports
  ];

  const filteredReports = medicalReports.filter((report) => {
    const matchesSearch = report.patientName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      reportType === "all" || report.reportType === reportType;
    const matchesDoctor = !doctorFilter || report.doctor === doctorFilter;
    const matchesDateRange =
      (!dateRange.start || new Date(report.date) >= dateRange.start) &&
      (!dateRange.end || new Date(report.date) <= dateRange.end);
    return matchesSearch && matchesType && matchesDoctor && matchesDateRange;
  });

  const sortedReports = useMemo(() => {
    return [...filteredReports].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      if (a[secondarySortField] < b[secondarySortField])
        return sortOrder === "asc" ? -1 : 1;
      if (a[secondarySortField] > b[secondarySortField])
        return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredReports, sortField, secondarySortField, sortOrder]);

  const paginatedReports = sortedReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const toggleReportSelection = (id: string) => {
    setSelectedReports((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleBulkDownload = () => {
    // Implement bulk download functionality
  };

  const handleBulkDelete = () => {
    // Implement bulk delete functionality
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Medical Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage medical reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            color="primary"
            startContent={<FileText className="w-4 h-4" />}
          >
            Generate New Report
          </Button>
          <CSVLink data={filteredReports} filename={"medical-reports.csv"}>
            <Button
              color="primary"
              startContent={<Download className="w-4 h-4" />}
            >
              Export CSV
            </Button>
          </CSVLink>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <Input
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="w-4 h-4 text-gray-400" />}
          className="max-w-xs"
        />
        <div className="flex gap-3 items-center justify-center">
          <Select
            placeholder="Filter by type"
            className="max-w-xs"
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value as "all" | "summary" | "detailed")
            }
          >
            <SelectItem key="all" value="all">
              All Reports
            </SelectItem>
            <SelectItem key="summary" value="summary">
              Summary
            </SelectItem>
            <SelectItem key="detailed" value="detailed">
              Detailed
            </SelectItem>
          </Select>
          <Select
            placeholder="Filter by doctor"
            className="max-w-xs"
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
          >
            <SelectItem key="" value="">
              All Doctors
            </SelectItem>
            <SelectItem key="Dr. Smith" value="Dr. Smith">
              Dr. Smith
            </SelectItem>
            <SelectItem key="Dr. Brown" value="Dr. Brown">
              Dr. Brown
            </SelectItem>
          </Select>
          <DateRangePicker
            label="Filter by date range"
            value={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        </div>
      </div>

      <Card className="shadow-none border-none">
        <CardBody>
          <Table aria-label="Medical Reports table" selectionMode="multiple">
            <TableHeader>
              <TableColumn>PATIENT NAME</TableColumn>
              <TableColumn>REPORT TYPE</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>DOCTOR</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedReports.map((report) => (
                <TableRow key={report.id}>
                  {/* <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedReports.has(report.id)}
                      onChange={() => toggleReportSelection(report.id)}
                    />
                  </TableCell> */}
                  <TableCell>{report.patientName}</TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>
                    {new Date(report.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{report.doctor}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        color="secondary"
                        startContent={<Eye className="w-4 h-4" />}
                        onClick={() => handleViewDetails(report)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        color="primary"
                        startContent={<Download className="w-4 h-4" />}
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
        <CardFooter>
          <Pagination
            total={Math.ceil(filteredReports.length / reportsPerPage)}
            initialPage={1}
            onChange={(page) => setCurrentPage(page)}
          />
        </CardFooter>
      </Card>

      {selectedReport && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalContent>
            <ModalHeader>
              <h3 className="text-lg font-semibold">
                {selectedReport.patientName} - {selectedReport.reportType}
              </h3>
            </ModalHeader>
            <ModalBody>
              <p>{selectedReport.details}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <div className="flex gap-2">
        <Button
          color="primary"
          onClick={() => handleBulkDownload()}
          disabled={selectedReports.size === 0}
        >
          Bulk Download
        </Button>
        <Button
          color="danger"
          onClick={() => handleBulkDelete()}
          disabled={selectedReports.size === 0}
        >
          Bulk Delete
        </Button>
      </div>
    </div>
  );
};

export default MedicalReport;
