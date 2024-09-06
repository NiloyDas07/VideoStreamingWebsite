import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FiMenu } from "react-icons/fi";

import { toggleSidebar } from "../../features/UiSlice";

const IconMenu = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const handleMenuButtonClick = () => {
    dispatch(toggleSidebar());
  };

  const textColor = `hover:text-accent focus:text-accent ${sidebarOpen ? "text-accent" : "text-secondary-1"}`;

  return (
    <button
      type="button"
      onClick={handleMenuButtonClick}
      className={`h-8 w-8 rounded-md md:sr-only ${sidebarOpen && "border border-neutral-1 ring-1"} ${textColor}`}
    >
      <FiMenu className={`h-full w-full`} />

      <span className="sr-only">Menu</span>
    </button>
  );
};

export default IconMenu;
