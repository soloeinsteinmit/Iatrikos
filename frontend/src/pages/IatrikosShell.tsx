import { Button } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/common/Navbar";
import { ROUTES } from "../routes/routeConstants";

const IatrikosShell = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background-content1 flex flex-col">
      {/* Navbar */}
      <NavbarComponent />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-4">
                <div className="font-inter font-medium text-gray-900 mb-6">
                  Quick Actions
                </div>
                <Button
                  className="w-full font-dmsans bg-blue-50 text-blue-600 hover:bg-blue-100"
                  variant="flat"
                  onClick={() => navigate(ROUTES.PATIENTS.NEW)}
                >
                  New Patient
                </Button>
                <Button
                  className="w-full font-dmsans bg-blue-50 text-blue-600 hover:bg-blue-100"
                  variant="flat"
                  onClick={() => navigate(ROUTES.CASES.NEW)}
                >
                  New Case
                </Button>
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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
