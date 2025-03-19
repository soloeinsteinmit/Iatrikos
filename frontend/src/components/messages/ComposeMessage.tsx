import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Chip,
  Avatar,
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
  Users,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";

interface Recipient {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface ComposeMessageProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: any) => void;
}

const ComposeMessage: React.FC<ComposeMessageProps> = ({
  isOpen,
  onClose,
  onSend,
}) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const suggestedRecipients: Recipient[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      role: "Cardiologist",
    },
    // Add more suggested recipients
  ];

  const handleAddRecipient = (recipient: Recipient) => {
    setRecipients((prev) => [...prev, recipient]);
  };

  const handleRemoveRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAttachFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">New Message</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center border-b pb-2">
              <span className="text-sm text-gray-500">To:</span>
              {recipients.map((recipient) => (
                <Chip
                  key={recipient.id}
                  onClose={() => handleRemoveRecipient(recipient.id)}
                  avatar={<Avatar src={recipient.avatar} size="sm" />}
                >
                  {recipient.name}
                </Chip>
              ))}
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    className="min-w-unit-6 w-unit-6 h-unit-6"
                  >
                    <Plus size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {suggestedRecipients.map((recipient) => (
                    <DropdownItem
                      key={recipient.id}
                      onClick={() => handleAddRecipient(recipient)}
                      startContent={<Avatar src={recipient.avatar} size="sm" />}
                    >
                      <div>
                        <p>{recipient.name}</p>
                        <p className="text-sm text-gray-500">
                          {recipient.role}
                        </p>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <Input
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Textarea
              label="Message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minRows={8}
            />

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="flat"
                startContent={<Paperclip size={16} />}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                Attach Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                className="hidden"
                onChange={handleAttachFiles}
              />
              <Button
                size="sm"
                variant="flat"
                startContent={<ImageIcon size={16} />}
              >
                Add Images
              </Button>
              <Button
                size="sm"
                variant="flat"
                startContent={<Link size={16} />}
              >
                Add Link
              </Button>
            </div>

            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <Chip
                    key={index}
                    onClose={() => {
                      setAttachments((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    {file.name}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={() => {
              onSend({
                recipients,
                subject,
                content,
                attachments,
              });
              onClose();
            }}
          >
            Send Message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ComposeMessage;
