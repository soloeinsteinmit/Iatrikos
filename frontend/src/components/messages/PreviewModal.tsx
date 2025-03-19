import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Spinner,
  Progress,
} from "@nextui-org/react";
import {
  Download,
  ExternalLink,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getFileType } from "../../utils/fileUtils";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    name: string;
    type: string;
    url?: string;
    size: string;
  };
  allFiles?: Array<{ url: string; type: string; name: string }>;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  file,
  allFiles = [],
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(file);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const fileType = getFileType(file.type);
  const isImage = fileType === "image";
  const isPDF = fileType === "pdf";

  // Gallery navigation
  const images = allFiles?.filter((f) => getFileType(f.type) === "image") || [];

  useEffect(() => {
    const index = images.findIndex((img) => img.url === file.url);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentImage(file);
    }
  }, [file, images]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setCurrentImage({
      name: `Image ${nextIndex + 1}`,
      type: "image",
      url: images[nextIndex].url,
      size: "N/A",
    });
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setCurrentImage({
      name: `Image ${prevIndex + 1}`,
      type: "image",
      url: images[prevIndex].url,
      size: "N/A",
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(file.url || "");
      const contentLength = response.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      const reader = response.body?.getReader();
      let receivedLength = 0;

      // Create a new ReadableStream and read it
      const chunks = [];
      while (true && reader) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        setDownloadProgress(total ? (receivedLength / total) * 100 : 0);
      }

      // Combine chunks and create download link
      const blob = new Blob(chunks);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setTimeout(() => setDownloadProgress(0), 500);
    }
  };

  // "https://www.ostomy.org/wp-content/uploads/2018/09/Medical-record_-web-1030x704.jpg"
  const getPreviewContent = () => {
    if (isImage) {
      return (
        <div className="relative w-full h-[600px]">
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="bg-black/50 text-white"
              onClick={handleZoomOut}
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="bg-black/50 text-white"
              onClick={handleZoomIn}
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="bg-black/50 text-white"
              onClick={handleRotate}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: "transform 0.2s ease-in-out",
            }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.name}
              className="max-w-full max-h-full object-contain"
              onLoad={() => setIsLoading(false)}
            />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    idx === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setCurrentImage({
                      name: `Image ${idx + 1}`,
                      type: "image",
                      url: images[idx].url,
                      size: "N/A",
                    });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      );
    } else if (isPDF) {
      return (
        <iframe
          src={`${file.url}#toolbar=0`}
          className="w-full h-[600px]"
          title={file.name}
          onLoad={() => setIsLoading(false)}
        />
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] gap-4">
          <p className="text-gray-500">
            Preview not available for this file type
          </p>
          <Button
            color="primary"
            startContent={<ExternalLink className="w-4 h-4" />}
            onClick={() => window.open(file.url, "_blank")}
          >
            Open in new tab
          </Button>
        </div>
      );
    }
  };

  // Reset zoom and rotation when changing images
  useEffect(() => {
    setScale(1);
    setRotation(0);
  }, [currentImage]);

  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{file.name}</span>
            <span className="text-sm text-gray-500">({file.size})</span>
          </div>
          <div className="flex gap-2">
            {downloadProgress > 0 ? (
              <div className="flex items-center gap-2">
                <Progress
                  size="sm"
                  value={downloadProgress}
                  className="w-24"
                  color="primary"
                  aria-label="Download progress"
                />
                <span className="text-sm text-gray-500">
                  {Math.round(downloadProgress)}%
                </span>
              </div>
            ) : (
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={handleDownload}
                isDisabled={downloadProgress > 0}
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
            {isPDF && (
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer className="w-4 h-4" />
              </Button>
            )}
          </div>
        </ModalHeader>
        <ModalBody className="relative p-0">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
              <Spinner size="lg" />
            </div>
          )}
          {isImage && images.length > 1 && (
            <>
              <Button
                isIconOnly
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={handlePrevious}
              >
                <ChevronLeft />
              </Button>
              <Button
                isIconOnly
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight />
              </Button>
            </>
          )}
          {getPreviewContent()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
