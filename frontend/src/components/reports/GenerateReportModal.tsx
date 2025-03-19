import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  DateRangePicker,
} from "@nextui-org/react";
import { useState } from "react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (reportData: any) => void;
}

interface ReportData {
  title: string;
  type: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  includeMetrics: {
    patientStats: boolean;
    treatments: boolean;
    outcomes: boolean;
    financials: boolean;
  };
  format: string;
  notes: string;
}

const GenerateReportModal = ({
  isOpen,
  onClose,
  onGenerate,
}: GenerateReportModalProps) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReportData, string>>
  >({});
  const [dateRange, setDateRange] = useState<RangeValue<DateValue>>({
    start: parseDate(new Date().toISOString().split("T")[0]),
    end: parseDate(new Date().toISOString().split("T")[0]),
  });
  const [reportData, setReportData] = useState<ReportData>({
    title: "",
    type: "",
    dateRange: {
      from: null,
      to: null,
    },
    includeMetrics: {
      patientStats: true,
      treatments: true,
      outcomes: true,
      financials: false,
    },
    format: "pdf",
    notes: "",
  });

  const handleDateRangeChange = (value: RangeValue<DateValue>) => {
    setDateRange(value);
    if (value?.start && value?.end) {
      setReportData({
        ...reportData,
        dateRange: {
          from: value.start.toDate(getLocalTimeZone()),
          to: value.end.toDate(getLocalTimeZone()),
        },
      });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof ReportData, string>> = {};

    if (!reportData.title.trim()) {
      newErrors.title = "Report title is required";
    }
    if (!reportData.type) {
      newErrors.type = "Report type is required";
    }
    if (!reportData.dateRange.from || !reportData.dateRange.to) {
      newErrors.dateRange = "Date range is required";
    }
    if (
      reportData.dateRange.from &&
      reportData.dateRange.to &&
      reportData.dateRange.from > reportData.dateRange.to
    ) {
      newErrors.dateRange = "Start date must be before end date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onGenerate(reportData);
      onClose();
    }
  };

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Generate New Report</ModalHeader>
          <ModalBody className="gap-4">
            <div className="space-y-4">
              <Input
                label="Report Title"
                placeholder="Enter report title"
                value={reportData.title}
                onChange={(e) =>
                  setReportData({ ...reportData, title: e.target.value })
                }
                isInvalid={!!errors.title}
                errorMessage={errors.title}
                isRequired
              />

              <Select
                label="Report Type"
                placeholder="Select report type"
                value={reportData.type}
                onChange={(e) =>
                  setReportData({ ...reportData, type: e.target.value })
                }
                isInvalid={!!errors.type}
                errorMessage={errors.type}
                isRequired
              >
                <SelectItem key="clinical">Clinical Report</SelectItem>
                <SelectItem key="financial">Financial Report</SelectItem>
                <SelectItem key="analytics">Analytics Report</SelectItem>
              </Select>

              <div className="space-y-2">
                <p className="text-sm font-medium">Date Range</p>
                <DateRangePicker
                  label="Select date range"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                  className={errors.dateRange ? "border-danger" : ""}
                />
                {errors.dateRange && (
                  <p className="text-danger text-xs">{errors.dateRange}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Include Metrics</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(reportData.includeMetrics).map(
                    ([key, value]) => (
                      <Checkbox
                        key={key}
                        isSelected={value}
                        onValueChange={(checked) =>
                          setReportData({
                            ...reportData,
                            includeMetrics: {
                              ...reportData.includeMetrics,
                              [key]: checked,
                            },
                          })
                        }
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Checkbox>
                    )
                  )}
                </div>
              </div>

              <Select
                label="Output Format"
                value={reportData.format}
                onChange={(e) =>
                  setReportData({ ...reportData, format: e.target.value })
                }
              >
                <SelectItem key="pdf">PDF</SelectItem>
                <SelectItem key="excel">Excel</SelectItem>
                <SelectItem key="csv">CSV</SelectItem>
              </Select>

              <Textarea
                label="Additional Notes"
                placeholder="Enter any additional notes or requirements"
                value={reportData.notes}
                onChange={(e) =>
                  setReportData({ ...reportData, notes: e.target.value })
                }
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default GenerateReportModal;
