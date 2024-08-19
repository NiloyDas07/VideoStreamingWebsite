import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleSidebar } from "../../features/UiSlice";

const IconMenu = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

  const textColor = `${sidebarOpen ? "text-accent" : "text-secondary-1"}`;

  return (
    <button
      onClick={() => dispatch(toggleSidebar())}
      className={`h-8 w-8 rounded-md md:sr-only ${sidebarOpen && "border border-neutral-1 ring-1"}`}
    >
      <svg
        className={`h-full w-full ${textColor}`}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke=""
      >
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M5 12H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>{" "}
          <path
            d="M5 17H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>{" "}
          <path
            d="M5 7H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>{" "}
        </g>
      </svg>

      <span className="sr-only">Menu</span>
    </button>
  );
};

export default IconMenu;
