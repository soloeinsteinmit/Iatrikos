import { Button, Avatar, Badge } from "@nextui-org/react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  FileText,
  Activity,
  Settings,
  Bell,
  Plus,
  Calendar,
  Home,
} from "lucide-react";
import NavbarComponent from "../components/common/Navbar";
import { ROUTES } from "../routes/routeConstants";

const IatrikosShell = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", route: ROUTES.DASHBOARD },
    { icon: Users, label: "Patients", route: ROUTES.PATIENTS.LIST },
    { icon: FileText, label: "Cases", route: ROUTES.CASES.LIST },
    { icon: Activity, label: "Analytics", route: ROUTES.ANALYTICS },
    { icon: Calendar, label: "Schedule", route: ROUTES.SCHEDULE },
  ];

  const isActiveRoute = (route: string) => location.pathname === route;

  return (
    <div className="min-h-screen bg-background-content1 flex flex-col">
      <NavbarComponent />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 left-0 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div className="flex items-center space-x-3 pb-6 border-b">
                <Avatar
                  src="https://i.pravatar.cc/150?u=doctor"
                  className="w-12 h-12"
                />
                <div>
                  <p className="font-semibold text-gray-800">Dr. Smith</p>
                  <p className="text-sm text-gray-500">General Physician</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    className="w-full justify-start font-medium"
                    color="primary"
                    startContent={<Plus className="h-4 w-4" />}
                    onClick={() => navigate(ROUTES.PATIENTS.NEW)}
                  >
                    New Patient
                  </Button>
                  <Button
                    className="w-full justify-start font-medium"
                    color="primary"
                    variant="flat"
                    startContent={<Plus className="h-4 w-4" />}
                    onClick={() => navigate(ROUTES.CASES.NEW)}
                  >
                    New Case
                  </Button>
                </div>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.route}
                    className={`w-full justify-start ${
                      isActiveRoute(item.route)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    variant="light"
                    startContent={<item.icon className="h-4 w-4" />}
                    onClick={() => navigate(item.route)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>

              <div className="pt-6 border-t">
                <Button
                  className="w-full justify-start text-gray-600 hover:bg-gray-50"
                  variant="light"
                  startContent={<Settings className="h-4 w-4" />}
                  onClick={() => navigate(ROUTES.SETTINGS)}
                >
                  Settings
                </Button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 font-dmsans text-sm">
            © 2024 Iatrikos. All rights reserved. Developed with ❤️‍🔥 by{" "}
            <a
              href="https://www.linkedin.com/in/solomon-eshun-788568317?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="transition-all hover:text-blue-500 font-bold"
              target="_blank"
            >
              Solomon Eshun
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IatrikosShell;
