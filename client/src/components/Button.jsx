import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  borderRadius = "rounded-lg",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${bgColor} ${textColor} ${borderRadius} ${className} px-4 py-2 hover:opacity-80 active:opacity-100`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
