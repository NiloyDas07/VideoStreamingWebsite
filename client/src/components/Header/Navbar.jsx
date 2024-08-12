import React from "react";
import { useSelector } from "react-redux";

import NavItem from "./NavItem.jsx";
import Logo from "../Logo.jsx";
import Container from "../Container.jsx";
import Logout from "./Logout.jsx";

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
    <div className="fixed z-50 h-[55px] w-full bg-slate-500 py-2">
      <Container className="flex items-center justify-between">
        <Logo />
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
      </Container>
    </div>
  );
};

export default Navbar;
