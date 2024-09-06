import React, { useEffect, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { VideoCard } from "../";
import {
  getAllVideos,
  getVideosLikedByUser,
  getWatchHistory,
} from "../../actions/videoActions";
import { useLocation } from "react-router-dom";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Videos = ({ forPage }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { videos, loading, error, searchQuery } = useSelector(
    (state) => state.videos,
  );
  const { channel } = useSelector((state) => state.channel);

  const location = useLocation();

  const { hasNextPage, nextPage, videos: videoList } = videos;

  // Local state for managing current page number
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch videos based on the search query and current page
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (forPage === "channel") {
          dispatch(getAllVideos({ userId: channel?._id }));

        } else if (forPage === "profile") {
          dispatch(getAllVideos({ userId: user._id }));

        } else if (forPage === "liked-videos") {
          const res = await dispatch(
            getVideosLikedByUser({ pageNumber: nextPage }),
          );

        } else if (forPage === "watch-history") {
          await dispatch(getWatchHistory({ pageNumber: nextPage }));

        } else {
          await dispatch(
            getAllVideos({ query: searchQuery, pageNumber: nextPage }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideos();
  }, [dispatch, searchQuery, currentPage, channel, forPage, user]);

  // Handle infinite scroll
  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasNextPage && !loading) {
          setCurrentPage((prevPage) => nextPage);
        }
      }
    }, 1000),
    [hasNextPage, loading],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading && currentPage === 1) {
    return <p>Loading...</p>;
  }

  if (!videoList || videoList.length === 0) {
    return (
      <div>
        <p>No videos available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-around gap-3">
      {videoList.map((video) => (
        <VideoCard video={video} key={`${video._id}-${uuidv4()}`} />
      ))}
      {loading && currentPage > 1 && <p>Loading more videos...</p>}
    </div>
  );
};

export default Videos;
