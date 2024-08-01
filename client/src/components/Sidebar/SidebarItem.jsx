import React from "react";
import Button from "../Button";

const SidebarItem = ({ children, onClick, className = "", ...props }) => {
  return (
    <Button
      onClick={onClick}
      bgColor="bg-black"
      className={`w-[80%] rounded-md px-2 py-1 text-center text-white ${className}`}
    >
      {children}
    </Button>
  );
};

export default SidebarItem;
