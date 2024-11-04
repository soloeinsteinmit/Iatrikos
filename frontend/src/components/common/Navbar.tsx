import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";
import { ROUTES } from "../../routes/routeConstants";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar
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
          <div className="font-inter font-bold text-xl text-blue-600">
            Iatrikos
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            className="font-dmsans text-gray-600 hover:text-blue-600"
            to={ROUTES.DASHBOARD}
          >
            Dashboard
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className="font-dmsans text-gray-600 hover:text-blue-600"
            to={ROUTES.PATIENTS.ROOT}
          >
            Patients
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className="font-dmsans text-gray-600 hover:text-blue-600"
            to={ROUTES.CASES.ROOT}
          >
            Clinical Cases
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button variant="flat" color="primary" className="font-dmsans">
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <NavLink className="w-full font-dmsans" to={ROUTES.DASHBOARD}>
            Dashboard
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink className="w-full font-dmsans" to={ROUTES.PATIENTS.ROOT}>
            Patients
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink className="w-full font-dmsans" to={ROUTES.CASES.ROOT}>
            Clinical Cases
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarComponent;
