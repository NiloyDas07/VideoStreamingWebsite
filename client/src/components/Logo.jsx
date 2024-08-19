import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className, ...props }) => {
  return (
    <Link to="/">
      <h1 className={`text-3xl font-bold ${className}`}>
        Logo
        <span className="sr-only">Go to homepage</span>
      </h1>
    </Link>
  );
};

export default Logo;
