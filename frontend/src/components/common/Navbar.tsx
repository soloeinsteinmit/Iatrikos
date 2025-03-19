import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Breadcrumbs,
  BreadcrumbItem,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import React from "react";
import { ROUTES } from "../../routes/routeConstants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Settings,
  LogOut,
  MessageSquare,
  Calendar,
  AlertCircle,
  User,
  Home,
  Users,
  FileText,
  Activity,
  LucideIcon,
} from "lucide-react";

interface Notification {
  id: number;
  type: "appointment" | "message" | "alert";
  message: string;
  time: string;
  icon: LucideIcon;
}

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [notifications] = React.useState<Notification[]>([
    {
      id: 1,
      type: "appointment",
      message: "Upcoming appointment with Patient John Doe",
      time: "10 minutes ago",
      icon: Calendar,
    },
    {
      id: 2,
      type: "message",
      message: "New message from Dr. Jane Smith",
      time: "1 hour ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "alert",
      message: "Critical lab results for Patient Alice Brown",
      time: "2 hours ago",
      icon: AlertCircle,
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: path
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        href,
      };
    });
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", route: ROUTES.DASHBOARD },
    { icon: Users, label: "Patients", route: ROUTES.PATIENTS.LIST },
    { icon: FileText, label: "Cases", route: ROUTES.CASES.LIST },
    { icon: Activity, label: "Analytics", route: ROUTES.ANALYTICS },
  ];

  const getNotificationStyles = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return {
          bg: "bg-red-100",
          text: "text-red-500",
        };
      case "message":
        return {
          bg: "bg-blue-100",
          text: "text-blue-500",
        };
      case "appointment":
        return {
          bg: "bg-green-100",
          text: "text-green-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-500",
        };
    }
  };

  return (
    <Navbar
      maxWidth="full"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white border-b border-gray-200"
    >
      <NavbarContent>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <div
            className="font-inter font-bold text-xl text-blue-600 cursor-pointer flex items-center gap-2"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            {/* <img src="/logo.svg" alt="Iatrikos" className="h-8 w-8" /> */}
            Iatrikos
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Breadcrumbs>
            <BreadcrumbItem
              onClick={() => navigate(ROUTES.DASHBOARD)}
              className="text-blue-600"
            >
              Home
            </BreadcrumbItem>
            {getBreadcrumbs().map((crumb, index) => (
              <BreadcrumbItem
                key={index}
                onClick={() => navigate(crumb.href)}
                className="capitalize"
              >
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-gray-500">
                <Badge content="3" color="danger">
                  <Bell className="h-5 w-5" />
                </Badge>
              </Button>
            </DropdownTrigger>
            {/* TODO: Add notifications */}
            <DropdownMenu
              aria-label="Notifications"
              className="w-80"
              itemClasses={{
                base: "gap-4",
              }}
            >
              {/* {notifications.map((notification) => {
                const styles = getNotificationStyles(notification.type);
                return (
                  <DropdownItem
                    key={notification.id}
                    description={notification.time}
                    startContent={
                      <div className={`p-2 rounded-full ${styles.bg}`}>
                        <notification.icon
                          className={`h-4 w-4 ${styles.text}`}
                        />
                      </div>
                    }
                  >
                    {notification.message}
                  </DropdownItem>
                );
              })} */}
              {notifications.map((notification) => (
                <DropdownItem
                  key={notification.id}
                  description={notification.time}
                  className="text-primary"
                  onClick={() => navigate(ROUTES.NOTIFICATIONS)}
                  startContent={
                    <div
                      className={`p-2 rounded-full ${
                        getNotificationStyles(notification.type).bg
                      }`}
                    >
                      <notification.icon
                        className={`h-4 w-4 ${
                          getNotificationStyles(notification.type).text
                        }`}
                      />
                    </div>
                  }
                >
                  {notification.message}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  src="https://i.pravatar.cc/150?u=doctor"
                  size="sm"
                  className="cursor-pointer"
                />
                <span className="font-medium text-gray-700 hidden sm:block">
                  Dr. Smith
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem
                key="user-info"
                className="h-14 gap-2"
                textValue="User Info"
              >
                <p className="font-semibold">Dr. Smith</p>
                <p className="text-sm text-gray-500">doctor@example.com</p>
              </DropdownItem>
              <DropdownItem
                key="profile"
                startContent={<User className="h-4 w-4" />}
                onClick={() => navigate(ROUTES.SETTINGS)}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Settings className="h-4 w-4" />}
                onClick={() => navigate(ROUTES.SETTINGS)}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogOut className="h-4 w-4" />}
                onClick={() => navigate(ROUTES.AUTH.LOGIN)}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <Button
              className="w-full justify-start"
              variant="light"
              onClick={() => {
                navigate(item.route);
                setIsMenuOpen(false);
              }}
              startContent={<item.icon className="h-4 w-4" />}
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent;
