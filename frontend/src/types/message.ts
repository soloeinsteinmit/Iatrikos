export interface Attachment {
  name: string;
  size: string;
  type: string;
  url?: string;
  thumbnailUrl?: string;
}

export interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    role: string;
  };
  subject: string;
  content: string;
  timestamp: string;
  category: "clinical" | "administrative" | "urgent";
  isRead: boolean;
  isStarred: boolean;
  isPinned: boolean;
  attachments: Attachment[];
  thread?: Message[];
  status: "sent" | "delivered" | "read";
}
