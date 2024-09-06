import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { setSidebar } from "../../features/UiSlice";
import { useDispatch } from "react-redux";

const NavItem = ({ children, name, path }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (window.innerWidth < 768) {
      dispatch(setSidebar(false));
    }
  }, [dispatch]);

  return (
    <li className="font-semibold hover:text-accent" onClick={handleClick}>
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
