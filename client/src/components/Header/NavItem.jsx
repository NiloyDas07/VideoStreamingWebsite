import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ children, name, path }) => {
  return (
    <li className="font-semibold hover:text-accent">
      {children || (
        <NavLink
          to={path}
          className={({ isActive }) => (isActive ? "text-accent" : "")}
        >
          {name}
        </NavLink>
      )}
    </li>
  );
};

export default NavItem;
