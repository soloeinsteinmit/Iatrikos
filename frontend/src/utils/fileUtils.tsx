import React from "react";

import {
  FileText,
  Image as ImageIcon,
  FileCode,
  Film,
  Music,
  File,
  FileSpreadsheet,
} from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa6";

export const getFileType = (type: string) => {
  if (type.includes("image")) return "image";
  if (type.includes("pdf")) return "pdf";
  if (type.includes("spreadsheet") || type.includes("excel"))
    return "spreadsheet";
  if (type.includes("video")) return "video";
  if (type.includes("audio")) return "audio";
  if (type.includes("code") || type.includes("json")) return "code";
  return "document";
};

export const getFileIcon = (type: string) => {
  const fileType = getFileType(type);
  switch (fileType) {
    case "image":
      return <ImageIcon className="w-4 h-4" />;
    case "pdf":
      return <FaRegFilePdf className="w-4 h-4" />;
    case "spreadsheet":
      return <FileSpreadsheet className="w-4 h-4" />;
    case "video":
      return <Film className="w-4 h-4" />;
    case "audio":
      return <Music className="w-4 h-4" />;
    case "code":
      return <FileCode className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};
