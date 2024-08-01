import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ children, name, path }) => {
  return (
    <li className="font-semibold">
      {children || <Link to={path}>{name}</Link>}
    </li>
  );
};

export default NavItem;
