import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../features/multipleVideoSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInputRef.current.value));
    navigate("/");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto mb-4 flex w-full items-center"
    >
      <input
        type="text"
        ref={searchInputRef}
        className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-primary"
        placeholder="Search..."
      />
      <button
        type="submit"
        className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
