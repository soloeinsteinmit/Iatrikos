import { useState, useEffect } from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { ExternalLink, Globe } from "lucide-react";

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname: string;
  favicon?: string;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
}

const API_URL = "http://localhost:3001/api"; // Next.js server URL

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, className }) => {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `${API_URL}/link-preview?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        console.error("Error fetching link preview:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      setLoading(true);
      setError(false);
      fetchMetadata();
    }
  }, [url]);

  if (error) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
      >
        <Globe className="w-4 h-4" />
        <span className="truncate">{url}</span>
      </a>
    );
  }

  return (
    <Card
      className={`overflow-hidden hover:opacity-95 transition-opacity ${className}`}
    >
      <CardBody className="p-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex"
        >
          {loading ? (
            <div className="flex w-full h-[140px]">
              <Skeleton className="rounded-l basis-1/3 h-full" />
              <div className="flex-1 p-3 space-y-3">
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
              </div>
            </div>
          ) : (
            <div className="flex w-full">
              {metadata?.image && (
                <div className="basis-1/3 min-w-[140px]">
                  <img
                    src={metadata.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {metadata?.favicon && (
                    <img
                      src={metadata.favicon}
                      alt=""
                      className="w-4 h-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <span className="text-xs text-gray-500">
                    {metadata?.hostname}
                  </span>
                </div>
                <h3 className="font-medium line-clamp-2 mb-1">
                  {metadata?.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {metadata?.description}
                </p>
              </div>
              <div className="flex items-center px-3 text-gray-400">
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          )}
        </a>
      </CardBody>
    </Card>
  );
};

export default LinkPreview;
