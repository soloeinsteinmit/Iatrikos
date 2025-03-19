import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Tabs,
  Tab,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import {
  Bell,
  MoreVertical,
  Check,
  Trash,
  Archive,
  Search,
  Filter,
} from "lucide-react";
import NotificationItem from "../components/notifications/NotificationItem";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  isRead: boolean;
  category: string;
}

const Notifications = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [filterType, setFilterType] = useState<string>("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Message",
      message: "You have received a new message from Dr. Smith",
      type: "info",
      timestamp: "2 hours ago",
      isRead: false,
      category: "message",
    },
    {
      id: "2",
      title: "Report Ready",
      message: "Your lab results are now available",
      type: "success",
      timestamp: "1 day ago",
      isRead: true,
      category: "report",
    },
    {
      id: "3",
      title: "Appointment Reminder",
      message: "Your appointment with Dr. Johnson is tomorrow at 2 PM",
      type: "warning",
      timestamp: "3 days ago",
      isRead: false,
      category: "appointment",
    },
    {
      id: "4",
      title: "System Update",
      message: "New features have been added to the platform",
      type: "info",
      timestamp: "1 week ago",
      isRead: true,
      category: "system",
    },
  ]);

  const filteredAndSortedNotifications = notifications
    .filter((notif) => {
      const matchesSearch =
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab =
        selectedTab === "all" || (selectedTab === "unread" && !notif.isRead);
      const matchesType = filterType === "all" || notif.type === filterType;
      return matchesSearch && matchesTab && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="p-4">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Notifications</h1>
              <div className="flex gap-2">
                <Button
                  color="primary"
                  variant="flat"
                  onClick={() =>
                    setNotifications(
                      notifications.map((n) => ({ ...n, isRead: true }))
                    )
                  }
                >
                  Mark all as read
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onClick={() => setNotifications([])}
                >
                  Clear all
                </Button>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Input
                placeholder="Search notifications..."
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full max-w-md"
              />

              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="flat"
                    startContent={<Filter className="w-4 h-4" />}
                  >
                    Filter
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={new Set([filterType])}
                  onSelectionChange={(keys) =>
                    setFilterType(Array.from(keys)[0] as string)
                  }
                >
                  <DropdownItem key="all">All Types</DropdownItem>
                  <DropdownItem key="info">Information</DropdownItem>
                  <DropdownItem key="success">Success</DropdownItem>
                  <DropdownItem key="warning">Warning</DropdownItem>
                  <DropdownItem key="error">Error</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat">
                    Sort:{" "}
                    {sortBy === "newest" ? "Newest First" : "Oldest First"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  selectedKeys={new Set([sortBy])}
                  onSelectionChange={(keys) =>
                    setSortBy(Array.from(keys)[0] as "newest" | "oldest")
                  }
                >
                  <DropdownItem key="newest">Newest First</DropdownItem>
                  <DropdownItem key="oldest">Oldest First</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key.toString())}
            >
              <Tab
                key="all"
                title={
                  <div className="flex items-center gap-2">
                    <span>All</span>
                    <Chip size="sm">{notifications.length}</Chip>
                  </div>
                }
              />
              <Tab
                key="unread"
                title={
                  <div className="flex items-center gap-2">
                    <span>Unread</span>
                    <Chip size="sm">
                      {notifications.filter((n) => !n.isRead).length}
                    </Chip>
                  </div>
                }
              />
            </Tabs>

            <AnimatePresence>
              <div className="space-y-4 mt-4">
                {filteredAndSortedNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                  >
                    <NotificationItem
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Notifications;
