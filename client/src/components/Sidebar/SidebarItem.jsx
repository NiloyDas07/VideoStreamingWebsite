import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, path, icon, className = "", ...props }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex w-full items-center justify-start gap-4 px-10 ${isActive ? "text-accent-2 dark:text-accent" : ""} ${className}`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`h-6 w-6 rounded-md p-[0.15rem] ring-1 ring-opacity-10 ${isActive ? "ring-accent-2" : "ring-transparent"}`}
          >
            {icon(isActive)}
          </span>
          <p
            className={`text-nowrap ${isActive ? "font-bold" : "font-normal"}`}
          >
            {name}
          </p>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
