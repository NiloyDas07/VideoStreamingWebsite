import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { setSidebar } from "../features/UiSlice";
import { setSearchQuery } from "../features/multipleVideoSlice";

const Logo = ({ className, ...props }) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (window.innerWidth < 768) {
      dispatch(setSidebar(false));
    }
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <Link to="/" onClick={handleClick}>
      <h1
        className={`text-3xl font-bold ${className} bg-gradient-to-r from-white to-accent bg-clip-text text-transparent`}
      >
        VIDS
        <span className="sr-only">Go to homepage</span>
      </h1>
    </Link>
  );
};

export default Logo;
