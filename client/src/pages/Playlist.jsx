import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getPlaylistById } from "../actions/playlistActions";
import { getAllVideos } from "../actions/videoActions";
import VideoCard from "../components/Main/VideoCard";

const Playlist = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { playlist, loading, error } = useSelector((state) => state.playlists);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        await dispatch(getPlaylistById({ playlistId: id }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist();
  }, [dispatch, id]);

  useEffect(() => {
    if (playlist) {
      setVideos(playlist.videos);
    }
  }, [playlist]);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div>
        <p>Your playlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-around gap-3 py-4">
      {videos.map((video) => (
        <VideoCard video={video} key={video._id} />
      ))}
    </div>
  );
};

export default Playlist;
