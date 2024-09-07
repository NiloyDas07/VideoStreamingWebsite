import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LuSun } from "react-icons/lu";
import { BsMoonStars } from "react-icons/bs";

import { setSidebar, toggleTheme } from "../../features/UiSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.ui);

  const handleClick = useCallback(() => {
    if (window.innerWidth < 768) {
      dispatch(setSidebar(false));
    }

    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-6 w-6 bg-transparent"
    >
      {theme === "dark" ? (
        <>
          <LuSun className="h-full w-full text-accent" />
          <span className="sr-only">Switch theme to light mode</span>
        </>
      ) : (
        <>
          <BsMoonStars className="h-full w-full text-accent" />
          <span className="sr-only">Switch theme to dark mode</span>
        </>
      )}
    </button>
  );
};

export default DarkModeToggle;
