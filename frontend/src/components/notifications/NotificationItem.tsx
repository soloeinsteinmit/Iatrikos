import {
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  MoreVertical,
  Check,
  Trash,
  Archive,
  Bell,
  Calendar,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    timestamp: string;
    isRead: boolean;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case "info":
        return <Bell className="w-5 h-5" />;
      case "success":
        return <Check className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getTypeStyles = () => {
    const baseStyles = "p-2 rounded-full";
    switch (notification.type) {
      case "info":
        return `${baseStyles} bg-primary-100 text-primary-500`;
      case "success":
        return `${baseStyles} bg-success-100 text-success-500`;
      case "warning":
        return `${baseStyles} bg-warning-100 text-warning-500`;
      case "error":
        return `${baseStyles} bg-danger-100 text-danger-500`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-500`;
    }
  };

  return (
    <Card
      className={`transition-all duration-200 ${
        notification.isRead ? "bg-white" : "bg-primary-50"
      }`}
    >
      <CardBody className="p-4">
        <div className="flex items-start gap-4">
          <div className={getTypeStyles()}>{getIcon()}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <span className="text-xs text-gray-400 mt-1">
                  {notification.timestamp}
                </span>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {!notification.isRead && (
                    <DropdownItem
                      startContent={<Check className="w-4 h-4" />}
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      Mark as read
                    </DropdownItem>
                  )}
                  <DropdownItem startContent={<Archive className="w-4 h-4" />}>
                    Archive
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Trash className="w-4 h-4" />}
                    className="text-danger"
                    onClick={() => onDelete(notification.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotificationItem;
