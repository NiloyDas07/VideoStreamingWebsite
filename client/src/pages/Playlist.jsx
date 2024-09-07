import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { deletePlaylist, getPlaylistById } from "../actions/playlistActions";
import { getAllVideos } from "../actions/videoActions";
import { VideoCard, SearchBox, Button } from "../components/";

const Playlist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handlePlaylistDelete = async () => {
    try {
      await dispatch(deletePlaylist({ playlistId: id }));
      navigate("/playlists");
    } catch (error) {
      alert("Failed to delete playlist");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-center text-2xl">Playlist is empty.</p>
        <Button
          bgColor="bg-red-600"
          className="w-full hover:underline"
          onClick={handlePlaylistDelete}
        >
          Delete Playlist
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <SearchBox />
      <div className="flex flex-wrap justify-around gap-3 py-4">
        {videos.map((video) => (
          <VideoCard video={video} key={video._id} />
        ))}
      </div>

      <Button
        bgColor="bg-red-600"
        className="w-full hover:underline"
        onClick={handlePlaylistDelete}
      >
        Delete Playlist
      </Button>
    </div>
  );
};

export default Playlist;
