import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../actions/videoActions";
import VideoCard from "../components/Main/VideoCard";
import SearchBox from "../components/Main/SearchBox";

const Home = () => {
  const dispatch = useDispatch();
  const { videos, loading, error, searchQuery } = useSelector(
    (state) => state.videos,
  );

  useEffect(() => {
    dispatch(getAllVideos({ query: searchQuery }));
  }, [dispatch, searchQuery]);

  if (!videos || !videos.data || videos.data.videos.length === 0) {
    return (
      <div>
        <SearchBox />
        <p>No videos available</p>
      </div>
    );
  }

  const videoList = videos.data.videos;

  return (
    <div>
      <SearchBox />
      <div className="flex flex-wrap justify-around gap-3">
        {videoList.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
