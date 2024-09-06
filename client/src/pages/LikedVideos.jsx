import React from "react";
import { SearchBox, Videos } from "../components";

const LikedVideos = () => {
  return (
    <div className="py-4">
      <SearchBox />
      {<Videos forPage="liked-videos" />}
    </div>
  );
};

export default LikedVideos;
