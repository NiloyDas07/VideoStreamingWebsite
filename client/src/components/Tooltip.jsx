import React, { useEffect, useRef, useState } from "react";

const Tooltip = ({ children, tooltip, className }) => {
  const tooltipRef = useRef(null);

  const [position, setPosition] = useState({
    left: "50%",
    right: "auto",
    transform: "translateX(-50%)",
  });

  useEffect(() => {
    const handlePositioning = () => {
      if (tooltipRef.current) {
        const tooltipElement = tooltipRef.current;
        const { left, right } = tooltipElement.getBoundingClientRect();

        const elementWidth = tooltipElement.offsetWidth;

        const overflowLeft = left - elementWidth < 0;
        const overflowRight = right + elementWidth > window.innerWidth - 40;

        if (overflowLeft) {
          setPosition({
            left: "0px",
            right: "auto",
            transform: "translateX(0)",
          });
        } else if (overflowRight) {
          setPosition({
            left: "auto",
            right: "0px",
            transform: "translateX(0)",
          });
        } else {
          setPosition({
            left: "50%",
            right: "auto",
            transform: "translateX(-50%)",
          });
        }
      }
    };

    setTimeout(handlePositioning, 500);

    window.addEventListener("resize", handlePositioning);

    return () => window.removeEventListener("resize", handlePositioning);
  }, [tooltip]);

  return (
    <div className={`group relative ${className}`} ref={tooltipRef}>
      {children}
      {tooltip && (
        <span
          className={`absolute top-full h-0 w-0 text-wrap rounded-md bg-accent-2 px-2 py-0.5 text-sm text-white opacity-0 transition-all after:absolute group-focus-within:h-max group-focus-within:w-max group-focus-within:opacity-100 group-hover:h-max group-hover:w-max group-hover:opacity-100`}
          style={{
            left: position.left,
            right: position.right,
            transform: position.transform,
          }}
        >
          {tooltip}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
