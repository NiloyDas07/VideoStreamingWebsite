import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addVideoToPlaylist,
  getUserPlaylists,
  removeVideoFromPlaylist,
} from "../../../actions/playlistActions";

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import Modal from "../Modal";
import CreateNewPlaylistButton from "./CreateNewPlaylistButton";

const AddToPlaylistButton = ({ size = "xl", className }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { playlists, error, loading } = useSelector((state) => state.playlists);
  const { video } = useSelector((state) => state.video);

  const handleOpenModal = () => {
    if (!user) {
      return alert("Please sign in to add videos to your playlists");
    }

    setIsModalVisible(true);
    getPlaylists();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Get all playlists of the user
  const getPlaylists = async () => {
    if (user) {
      try {
        await dispatch(getUserPlaylists({ userId: user._id }));
      } catch (error) {
        console.error("Failed to get user's playlists", error);
      }
    }
  };

  const handleTogglePlaylistSelection = async (checkBox, playlistId) => {
    if (checkBox.checked) {
      try {
        const response = await dispatch(
          addVideoToPlaylist({ videoId: video._id, playlistId }),
        );
        console.log(response);
      } catch (error) {
        console.error("Failed to add video to playlist", error);
      }
    } else {
      try {
        const response = await dispatch(
          removeVideoFromPlaylist({
            videoId: video._id,
            playlistId: playlistId,
          }),
        );
        console.log(response);
      } catch (error) {
        console.error("Failed to remove video from playlist", error);
      }
    }

    await getPlaylists();
  };

  return (
    <div className={`${className} flex items-center`}>
      <button onClick={handleOpenModal}>
        <span className="sr-only">Add to Playlist</span>
        <MdOutlinePlaylistAdd className={`text-${size}`} />
      </button>

      <Modal
        className="h-1/2"
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-8">
            <h2 className="text-lg font-bold">Add to Playlist</h2>

            <button onClick={handleCloseModal}>
              <span className="sr-only">Close modal</span>
              <IoClose className="text-2xl" />
            </button>
          </div>
        </div>

        {/* All playlists of the user. */}
        {loading && <p>Loading playlists...</p>}
        {error && <p>Failed to load playlists.</p>}
        {!loading && playlists.length === 0 && <p>No playlists found.</p>}
        {!loading && playlists.length > 0 && (
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2">
              {playlists.map((playlist) => (
                <li key={playlist._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`playlist-${playlist._id}`}
                    checked={playlist.videos.includes(video._id)}
                    onChange={(e) =>
                      handleTogglePlaylistSelection(e.target, playlist._id)
                    }
                  />
                  <label
                    htmlFor={`playlist-${playlist._id}`}
                    className="cursor-pointer truncate"
                  >
                    {playlist.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <CreateNewPlaylistButton handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default AddToPlaylistButton;