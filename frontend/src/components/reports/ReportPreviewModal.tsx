import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FileText, Download, Printer } from "lucide-react";

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    id: string;
    title: string;
    type: string;
    generated: string;
    content?: string;
  } | null;
}

const ReportPreviewModal = ({
  isOpen,
  onClose,
  report,
}: ReportPreviewModalProps) => {
  if (!report) return null;

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{report.title}</h3>
          <p className="text-sm text-gray-500">
            Generated on {new Date(report.generated).toLocaleDateString()}
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="bg-gray-50 p-4 rounded-lg min-h-[400px]">
            {/* Preview content would go here */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow-sm">
                <h4 className="font-medium mb-2">Report Summary</h4>
                <p className="text-sm text-gray-600">
                  This is a preview of the report content. In a real
                  implementation, this would contain the actual report data.
                </p>
              </div>
              {/* Add more preview sections as needed */}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<Printer className="w-4 h-4" />}
            >
              Print
            </Button>
            <Button
              variant="flat"
              startContent={<Download className="w-4 h-4" />}
            >
              Download
            </Button>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportPreviewModal;
