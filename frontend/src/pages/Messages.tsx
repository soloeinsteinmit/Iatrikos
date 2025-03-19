import {
  Card,
  CardBody,
  Input,
  Button,
  Avatar,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  Plus,
  Paperclip,
  Star,
  MoreVertical,
  //   Clock,
  Check,
  CheckCheck,
  Pin,
  Reply,
  Forward,
  Trash2,
  //   Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import ComposeMessage from "../components/messages/ComposeMessage";
import InlineReply from "../components/messages/InlineReply";
import AttachmentsPanel from "../components/messages/AttachmentsPanel";
import { Message } from "../types/message";

const Messages = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg1",
      sender: {
        name: "Dr. Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        role: "Cardiologist",
      },
      subject: "Patient Consultation Results",
      content: "Here are the latest test results for patient John Doe...",
      timestamp: "2024-03-20T10:30:00",
      category: "clinical",
      isRead: false,
      isStarred: true,
      isPinned: true,
      attachments: [
        { name: "test_results.pdf", size: "2.4 MB", type: "pdf" },
        { name: "ecg_reading.jpg", size: "1.2 MB", type: "image" },
      ],
      status: "delivered",
    },
    // Add more sample messages
  ]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [showInlineReply, setShowInlineReply] = useState<boolean>(false);
  const [showAttachmentsPanel, setShowAttachmentsPanel] = useState(true);

  //   useEffect(() => {
  //     // Simulating real-time updates
  //     const interval = setInterval(() => {
  //       const newMessage: Message = {
  //         id: `msg${messages.length + 1}`,
  //         sender: {
  //           name: "Dr. Alex Johnson",
  //           avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
  //           role: "Neurologist",
  //         },
  //         subject: "New patient referral",
  //         content: "I have a new patient that I'd like to refer to you...",
  //         timestamp: new Date().toISOString(),
  //         category: "clinical",
  //         isRead: false,
  //         isStarred: false,
  //         isPinned: false,
  //         attachments: [],
  //         status: "delivered",
  //       };
  //       setMessages((prevMessages) => [newMessage, ...prevMessages]);
  //     }, 30000); // Add a new message every 30 seconds

  //     return () => clearInterval(interval);
  //   }, [messages]);

  const groupMessagesByDate = (msgs: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    msgs.forEach((msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesCategory =
      selectedCategory === "all" || msg.category === selectedCategory;
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread = !showUnreadOnly || !msg.isRead;
    return matchesCategory && matchesSearch && matchesUnread;
  });

  const groupedMessages = groupMessagesByDate(filteredMessages);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Check className="w-4 h-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleReply = (message: Message) => {
    setSelectedMessage(message);
    setShowInlineReply(true);
  };

  const handleSendInlineReply = (content: string, attachments: File[]) => {
    if (selectedMessage) {
      const newReply: Message = {
        id: `reply${Date.now()}`,
        sender: {
          name: "You",
          avatar: "https://i.pravatar.cc/150?u=youravatar",
          role: "Your Role",
        },
        subject: `Re: ${selectedMessage.subject}`,
        content: content,
        timestamp: new Date().toISOString(),
        category: selectedMessage.category,
        isRead: true,
        isStarred: false,
        isPinned: false,
        attachments: attachments.map((file) => ({
          name: file.name,
          size: `${Math.round(file.size / 1024)} KB`,
          type: file.type,
        })),
        status: "sent",
      };

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === selectedMessage.id
            ? {
                ...msg,
                thread: [...(msg.thread || []), newReply],
              }
            : msg
        )
      );
      setShowInlineReply(false);
    }
  };

  const handleNewMessage = (messageData: any) => {
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      sender: {
        name: "You",
        avatar: "https://i.pravatar.cc/150?u=youravatar",
        role: "Your Role",
      },
      subject: messageData.subject,
      content: messageData.content,
      timestamp: new Date().toISOString(),
      category: "clinical",
      isRead: true,
      isStarred: false,
      isPinned: false,
      attachments: messageData.attachments.map((file: File) => ({
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type,
      })),
      status: "sent",
    };

    setMessages((prev) => [newMessage, ...prev]);
  };

  const getOrganizedAttachments = (message: Message) => {
    if (!message) return { attachments: [], images: [], links: [] };

    const files =
      message.attachments?.filter((att) => !att.type.includes("image")) || [];
    const images =
      message.attachments
        ?.filter((att) => att.type.includes("image"))
        .map((att) => att.url || "") || [];
    const links =
      message.attachments
        ?.filter((att) => att.type === "link")
        .map((att) => att.url || "") || [];

    return { attachments: files, images, links };
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-4 p-4">
      {/* Left Sidebar - Message List */}
      <Card className="w-1/4 overflow-hidden">
        <CardBody className="p-0">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <Button
                color="primary"
                size="sm"
                startContent={<Plus className="w-4 h-4" />}
                onClick={() => setIsComposeOpen(true)}
              >
                New Message
              </Button>
            </div>
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    size="sm"
                    startContent={<Filter className="w-4 h-4" />}
                  >
                    Filter
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={[selectedCategory]}
                  onSelectionChange={(keys) =>
                    setSelectedCategory(Array.from(keys)[0])
                  }
                >
                  <DropdownItem key="all">All Messages</DropdownItem>
                  <DropdownItem key="clinical">Clinical</DropdownItem>
                  <DropdownItem key="administrative">
                    Administrative
                  </DropdownItem>
                  <DropdownItem key="urgent">Urgent</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Button
                variant="flat"
                size="sm"
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              >
                {showUnreadOnly ? "Show All" : "Unread Only"}
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-12rem)]">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                <div className="px-4 py-2 bg-gray-50">
                  <span className="text-sm text-gray-600">{date}</span>
                </div>
                {msgs.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? "bg-gray-50" : ""
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={message.sender.avatar}
                        size="sm"
                        className="flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">
                            {message.sender.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {message.isPinned && (
                              <Pin className="w-4 h-4 text-gray-400" />
                            )}
                            {getStatusIcon(message.status)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {message.subject}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {!message.isRead && (
                            <Badge color="primary" size="sm">
                              New
                            </Badge>
                          )}
                          <Chip
                            size="sm"
                            color={
                              message.category === "urgent"
                                ? "danger"
                                : message.category === "clinical"
                                ? "primary"
                                : "default"
                            }
                          >
                            {message.category}
                          </Chip>
                          {message.attachments.length > 0 && (
                            <Paperclip className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Middle Side - Message Content */}
      <Card className="flex-grow overflow-hidden w-1/2">
        <CardBody className="p-0">
          {selectedMessage ? (
            <div className="flex-grow flex flex-col">
              {/* Existing message content */}
              <div className="p-4 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedMessage.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Avatar src={selectedMessage.sender.avatar} size="sm" />
                      <span>{selectedMessage.sender.name}</span>
                      <span>•</span>
                      <span>{selectedMessage.sender.role}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      isIconOnly
                      onClick={() => {
                        // Toggle star
                      }}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          selectedMessage.isStarred
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" variant="flat" isIconOnly>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem>Mark as Unread</DropdownItem>
                        <DropdownItem>Forward</DropdownItem>
                        <DropdownItem className="text-danger">
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
                {selectedMessage.attachments.length > 0 && (
                  <div className="flex gap-2">
                    {selectedMessage.attachments.map((attachment, index) => (
                      <Chip
                        key={index}
                        variant="flat"
                        startContent={<Paperclip className="w-4 h-4" />}
                      >
                        {attachment.name} ({attachment.size})
                      </Chip>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    color="primary"
                    startContent={<Reply className="w-4 h-4" />}
                    onClick={() => handleReply(selectedMessage)}
                  >
                    Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<Forward className="w-4 h-4" />}
                  >
                    Forward
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    color="danger"
                    startContent={<Trash2 className="w-4 h-4" />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              {/* Message content and thread */}
              <div className="flex-grow p-4 overflow-y-auto">
                <p>{selectedMessage.content}</p>
                {selectedMessage.thread &&
                  selectedMessage.thread.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-lg font-semibold mb-4">Thread</h4>
                      {selectedMessage.thread.map((reply) => (
                        <div
                          key={reply.id}
                          className="mb-4 border-l-2 border-blue-200 pl-4"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar src={reply.sender.avatar} size="sm" />
                            <span className="font-medium">
                              {reply.sender.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(reply.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p>{reply.content}</p>
                          {reply.attachments.length > 0 && (
                            <div className="flex gap-2 mt-2">
                              {reply.attachments.map((attachment, index) => (
                                <Chip
                                  key={index}
                                  variant="flat"
                                  startContent={
                                    <Paperclip className="w-4 h-4" />
                                  }
                                >
                                  {attachment.name} ({attachment.size})
                                </Chip>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                {showInlineReply && (
                  <InlineReply
                    onSend={handleSendInlineReply}
                    onCancel={() => setShowInlineReply(false)}
                    recipientName={selectedMessage.sender.name}
                    recipientAvatar={selectedMessage.sender.avatar}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view
            </div>
          )}
        </CardBody>
      </Card>

      {/* Right - Attachments Panel */}
      {selectedMessage && (
        <div
          className={`transition-all duration-300 ${
            showAttachmentsPanel ? "w-1/4" : "w-12"
          }`}
        >
          <AttachmentsPanel
            {...getOrganizedAttachments(selectedMessage)}
            isExpanded={showAttachmentsPanel}
            onToggle={() => setShowAttachmentsPanel(!showAttachmentsPanel)}
          />
        </div>
      )}

      <ComposeMessage
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={handleNewMessage}
      />
    </div>
  );
};

export default Messages;
