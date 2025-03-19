import { useState, useEffect } from "react";
import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import {
  ChevronRight,
  ChevronLeft,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Download,
  Eye,
  Paperclip,
} from "lucide-react";
import { Attachment } from "../../types/message";
import { PreviewModal } from "./PreviewModal";
import { useImageCache } from "../../hooks/useImageCache";
import LinkPreview from "../common/LinkPreview";

interface AttachmentsPanelProps {
  attachments?: Attachment[];
  links?: string[];
  images?: string[];
  isExpanded?: boolean;
  onToggle?: () => void;
}

const AttachmentsPanel: React.FC<AttachmentsPanelProps> = ({
  attachments = [],
  links = [],
  images = [],
  isExpanded = true,
  onToggle,
}) => {
  const [isLocalExpanded, setIsLocalExpanded] = useState(isExpanded);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Attachment | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { preloadImage, getCachedImage } = useImageCache();

  // Preload images when component mounts
  useEffect(() => {
    images.forEach((image) => preloadImage(image));
  }, [images]);

  images = [
    "https://www.ostomy.org/wp-content/uploads/2018/09/Medical-record_-web-1030x704.jpg",
    "https://images.pexels.com/photos/28280788/pexels-photo-28280788/free-photo-of-little-sunshine.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28320963/pexels-photo-28320963/free-photo-of-cafe-loft7.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28180453/pexels-photo-28180453/free-photo-of-a-black-and-white-photo-of-a-person-walking-up-some-stairs.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/29181016/pexels-photo-29181016/free-photo-of-american-bully-portrait-in-autumn-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/28887955/pexels-photo-28887955/free-photo-of-enchanting-aurora-borealis-over-serene-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/23105772/pexels-photo-23105772/free-photo-of-choice-of-surfboards-and-clothes.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    "https://images.pexels.com/photos/8343333/pexels-photo-8343333.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  ];

  links = [
    "https://nextjs.org/docs/pages/building-your-application/routing/api-routes",
    "https://www.facebook.com",
    "https://www.twitter.com",
  ];

  const handlePreview = (file: Attachment | string, type: string = "file") => {
    if (typeof file === "string") {
      setSelectedFile({
        name: `Image ${images.indexOf(file) + 1}`,
        type: "image",
        url: getCachedImage(file),
        size: "N/A",
      });
    } else {
      setSelectedFile({
        ...file,
        url: getCachedImage(file.url || ""),
      });
    }
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    setIsLocalExpanded(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    setIsTransitioning(true);
    if (onToggle) {
      onToggle();
    } else {
      setIsLocalExpanded(!isLocalExpanded);
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const currentExpanded = onToggle ? isExpanded : isLocalExpanded;

  const getFileIcon = (type: string) => {
    if (type.includes("image")) return <ImageIcon className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div
      className={` transition-all duration-300 ${
        currentExpanded ? "w-80" : "w-12"
      } ${isTransitioning ? "overflow-hidden" : ""}`}
    >
      <div
        className={`h-full flex flex-col ${
          currentExpanded ? "" : "items-center"
        }`}
      >
        <div
          className={`p-4 w-full flex items-center ${
            currentExpanded ? "justify-between" : "justify-center"
          }`}
        >
          {currentExpanded && (
            <span className="font-semibold">Attachments & Links</span>
          )}
          <Button isIconOnly variant="light" size="sm" onClick={handleToggle}>
            {currentExpanded ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <Paperclip className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {currentExpanded && (
        <div className="p-4 space-y-6">
          {/* Files Section */}
          {attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Files</h4>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardBody className="p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="text-sm font-medium truncate max-w-[150px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onClick={() => handlePreview(file)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button isIconOnly size="sm" variant="light">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Add Preview Modal */}
          {selectedFile && (
            <PreviewModal
              isOpen={isPreviewOpen}
              onClose={() => setIsPreviewOpen(false)}
              file={selectedFile}
              allFiles={images.map((url, index) => ({
                url,
                type: "image",
                name: `Image ${index + 1}`,
              }))}
            />
          )}

          {/* Images Section */}
          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Images</h4>
              <div className="grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                    onClick={() => handlePreview(image, "image")}
                  >
                    <img
                      src={image}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links Section */}
          {links?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Links</h4>
              <div className="space-y-3">
                {links.map((link, index) => (
                  <LinkPreview key={index} url={link} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttachmentsPanel;
