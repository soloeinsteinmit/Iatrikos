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
} from "@nextui-org/react";
import React from "react";
import { ROUTES } from "../../routes/routeConstants";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Settings, LogOut } from "lucide-react";

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter(Boolean);
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        href,
      };
    });
  };

  return (
    <Navbar
      maxWidth="2xl"
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
            className="font-inter font-bold text-xl text-blue-600 cursor-pointer"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Iatrikos
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Breadcrumbs>
            <BreadcrumbItem onClick={() => navigate(ROUTES.DASHBOARD)}>
              Home
            </BreadcrumbItem>
            {getBreadcrumbs().map((crumb, index) => (
              <BreadcrumbItem key={index} onClick={() => navigate(crumb.href)}>
                {crumb.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Button isIconOnly variant="light" className="text-gray-500">
            <Bell className="h-5 w-5" />
          </Button>
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
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem
                key="settings"
                startContent={<Settings className="h-4 w-4" />}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                startContent={<LogOut className="h-4 w-4" />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {/* Mobile menu items referenced from original code */}
        <NavbarMenuItem>
          <Button
            className="w-full justify-start"
            variant="light"
            onClick={() => navigate(ROUTES.DASHBOARD)}
          >
            Dashboard
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            className="w-full justify-start"
            variant="light"
            onClick={() => navigate(ROUTES.PATIENTS.ROOT)}
          >
            Patients
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            className="w-full justify-start"
            variant="light"
            onClick={() => navigate(ROUTES.CASES.ROOT)}
          >
            Clinical Cases
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent;
