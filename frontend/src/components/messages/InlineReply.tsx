import {
  Avatar,
  Button,
  Textarea,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Link,
  MoreVertical,
  Mic,
  MinusCircle,
} from "lucide-react";
import { useState, useRef } from "react";

interface InlineReplyProps {
  onSend: (content: string, attachments: File[]) => void;
  onCancel: () => void;
  recipientName: string;
  recipientAvatar: string;
}

const InlineReply: React.FC<InlineReplyProps> = ({
  onSend,
  onCancel,
  recipientName,
  recipientAvatar,
}) => {
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAttachFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSend = () => {
    onSend(content, attachments);
    setContent("");
    setAttachments([]);
  };

  return (
    <div className="border-l-2 border-blue-200 pl-4 mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <Avatar src={recipientAvatar} size="sm" />
        <span className="text-sm text-gray-600">Reply to {recipientName}</span>
        <Button
          size="sm"
          variant="light"
          isIconOnly
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MinusCircle size={16} />
        </Button>
      </div>

      {isExpanded && (
        <>
          <Textarea
            placeholder="Type your reply..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={3}
            className="w-full"
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="flat"
                startContent={<Paperclip size={16} />}
                onClick={() => fileInputRef.current?.click()}
              >
                Attach
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleAttachFiles}
              />
              <Button size="sm" variant="flat" startContent={<Mic size={16} />}>
                Voice
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" variant="flat" isIconOnly>
                    <MoreVertical size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem startContent={<ImageIcon size={16} />}>
                    Add Image
                  </DropdownItem>
                  <DropdownItem startContent={<Link size={16} />}>
                    Add Link
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="light"
                color="danger"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                startContent={<Send size={16} />}
                onClick={handleSend}
              >
                Send
              </Button>
            </div>
          </div>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 rounded-lg p-2"
                >
                  <Paperclip size={14} />
                  <span className="text-sm">{file.name}</span>
                  <Button
                    size="sm"
                    isIconOnly
                    variant="light"
                    onClick={() => {
                      setAttachments((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <MinusCircle size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InlineReply;
