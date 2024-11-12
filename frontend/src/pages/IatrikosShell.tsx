import { Button, Avatar } from "@nextui-org/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  FileText,
  Activity,
  Settings,
  Plus,
  Calendar,
  Home,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Stethoscope,
  BookOpen,
  MessageSquare,
  Bell,
} from "lucide-react";
import { useState } from "react";
import NavbarComponent from "../components/common/Navbar";
import { ROUTES } from "../routes/routeConstants";

const IatrikosShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", route: ROUTES.DASHBOARD },
    { icon: Users, label: "Patients", route: ROUTES.PATIENTS.LIST },
    { icon: FileText, label: "Cases", route: ROUTES.CASES.LIST },
    { icon: Activity, label: "Analytics", route: ROUTES.ANALYTICS },
    { icon: Calendar, label: "Schedule", route: ROUTES.SCHEDULE },
    { icon: Stethoscope, label: "Treatments", route: ROUTES.TREATMENTS },
    { icon: BarChart2, label: "Reports", route: ROUTES.REPORTS },
    { icon: BookOpen, label: "Medical Records", route: ROUTES.RECORDS },
    { icon: MessageSquare, label: "Messages", route: ROUTES.MESSAGES },
  ];

  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <div className="min-h-screen bg-background-content1">
      <NavbarComponent />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-white shadow-lg transition-all duration-300 z-20 ${
            isCollapsed ? "w-20" : "w-80"
          }`}
        >
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full z-30"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>

          <div className="p-4 h-full flex flex-col overflow-y-auto">
            <div className="flex items-center space-x-3 pb-6 border-b overflow-hidden">
              <Avatar
                src="https://i.pravatar.cc/150?u=doctor"
                className={`min-w-12 min-h-12 transition-all duration-300 ${
                  isCollapsed ? "scale-90" : "scale-100"
                }`}
                size="md"
              />

              <div
                className={`flex-1 transition-all duration-300 ${
                  isCollapsed
                    ? "opacity-0 -translate-x-4 w-0"
                    : "opacity-100 translate-x-0 w-auto"
                }`}
              >
                <p className="font-semibold text-gray-800 whitespace-nowrap">
                  Dr. Smith
                </p>
                <p className="text-sm text-gray-500 whitespace-nowrap">
                  General Physician
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1 mt-6 flex-grow overflow-hidden">
              {menuItems.map((item) => (
                <Button
                  key={item.route}
                  className={`w-full transition-all duration-300 ${
                    !isCollapsed ? "justify-start" : "justify-center"
                  } ${
                    isActiveRoute(item.route)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  variant="light"
                  isIconOnly={isCollapsed}
                  startContent={
                    <item.icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isCollapsed ? "scale-110" : "scale-100"
                      }`}
                    />
                  }
                  onClick={() => navigate(item.route)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isCollapsed
                        ? "opacity-0 -translate-x-4 w-0"
                        : "opacity-100 translate-x-0 w-auto"
                    } whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                </Button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="border-t pt-4 overflow-hidden">
              <div
                className={`transition-all duration-300 ${
                  isCollapsed
                    ? "opacity-0 -translate-y-4 h-0"
                    : "opacity-100 translate-y-0 h-auto mb-4"
                }`}
              >
                <h3 className="font-medium text-gray-900 whitespace-nowrap">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-2">
                <Button
                  className="w-full transition-all duration-300"
                  color="primary"
                  isIconOnly={isCollapsed}
                  startContent={
                    <Plus
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isCollapsed ? "scale-110" : "scale-100"
                      }`}
                    />
                  }
                  onClick={() => navigate(ROUTES.PATIENTS.NEW)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isCollapsed
                        ? "opacity-0 -translate-x-4 w-0"
                        : "opacity-100 translate-x-0 w-auto"
                    } whitespace-nowrap font-medium`}
                  >
                    New Patient
                  </span>
                </Button>

                <Button
                  className="w-full transition-all duration-300"
                  color="secondary"
                  isIconOnly={isCollapsed}
                  startContent={
                    <FileText
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isCollapsed ? "scale-110" : "scale-100"
                      }`}
                    />
                  }
                  onClick={() => navigate(ROUTES.CASES.NEW)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isCollapsed
                        ? "opacity-0 -translate-x-4 w-0"
                        : "opacity-100 translate-x-0 w-auto"
                    } whitespace-nowrap font-medium`}
                  >
                    New Case
                  </span>
                </Button>
              </div>
            </div>

            {/* Settings and Notifications */}
            <div className="border-t pt-4 mt-4 space-y-2 overflow-hidden">
              {["Notifications", "Settings"].map((item, index) => (
                <Button
                  key={item}
                  className="w-full transition-all duration-300"
                  variant="light"
                  isIconOnly={isCollapsed}
                  startContent={
                    index === 0 ? (
                      <Bell
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isCollapsed ? "scale-110" : "scale-100"
                        }`}
                      />
                    ) : (
                      <Settings
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isCollapsed ? "scale-110" : "scale-100"
                        }`}
                      />
                    )
                  }
                  onClick={() => index === 1 && navigate(ROUTES.SETTINGS)}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isCollapsed
                        ? "opacity-0 -translate-x-4 w-0"
                        : "opacity-100 translate-x-0 w-auto"
                    } whitespace-nowrap`}
                  >
                    {item}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-1 w-full transition-all duration-300 ${
            isCollapsed ? "ml-20" : "ml-80"
          } mt-[16px] mx-auto p-6`}
        >
          <div className="bg-white rounded-lg max-w-[1300px] mx-auto shadow-sm p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IatrikosShell;
