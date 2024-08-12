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
    const fetchVideos = async () => {
      try {
        await dispatch(getAllVideos({ query: searchQuery }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [dispatch, searchQuery]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!videos || videos.length === 0 || videos.videos.length === 0) {
    return (
      <div>
        <SearchBox />
        <p>No videos available</p>
      </div>
    );
  }

  const videoList = videos.videos;

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
