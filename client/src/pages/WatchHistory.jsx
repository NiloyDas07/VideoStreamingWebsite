import React from "react";
import { SearchBox, Videos } from "../components";

const WatchHistory = () => {
  return (
    <div className="py-4">
      <SearchBox />
      {<Videos forPage="watch-history" />}
    </div>
  );
};

export default WatchHistory;
