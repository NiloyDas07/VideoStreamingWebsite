import React from "react";
import { useSelector } from "react-redux";

import { DarkModeToggle, IconMenu, Logo, Logout, NavItem, Container } from "../";

const Navbar = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  const navItems = [
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Sign Up",
      path: "/signup",
      active: !authStatus,
    },
  ];

  return (
    <nav className="fixed z-50 h-[55px] w-full border border-neutral-1 bg-primary bg-opacity-90 py-2 text-white backdrop-blur-[2px]">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <IconMenu />
        <Logo />
        </div>
        <ul className="flex gap-5">
          {navItems.map(
            (item) =>
              item.active && (
                <NavItem name={item.name} path={item.path} key={item.name} />
              ),
          )}
          {authStatus && (
            <NavItem>
              <Logout />
            </NavItem>
          )}
        </ul>
        <DarkModeToggle />
      </Container>
    </nav>
  );
};

export default Navbar;
