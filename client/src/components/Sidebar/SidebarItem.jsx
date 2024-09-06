import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ name, path, icon, className = "", ...props }) => {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        `flex w-full items-center justify-start gap-4 px-10 hover:text-accent dark:hover:text-accent-2 ${isActive ? "text-accent-2 dark:text-accent" : ""} ${className}`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`h-6 w-6 rounded-md p-[0.15rem] ring-1 ring-opacity-10 ${isActive ? "ring-accent-2" : "ring-transparent"}`}
          >
            {icon}
          </span>
          <p
            className={`text-nowrap ${isActive ? "font-semibold" : "font-normal"} transition-all duration-500`}
          >
            {name}
          </p>
        </>
      )}
    </NavLink>
  );
};

export default SidebarItem;
