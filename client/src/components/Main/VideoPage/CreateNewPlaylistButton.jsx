import React, { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  addVideoToPlaylist,
  createPlaylist,
} from "../../../actions/playlistActions";

const CreateNewPlaylistButton = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const nameRef = useRef();
  const descriptionRef = useRef();

  const { video } = useSelector((state) => state.video);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    try {
      const createResponse = await dispatch(
        createPlaylist({ name, description }),
      );

      const newPlaylistId = createResponse?.payload?._id;

      if (!newPlaylistId) {
        throw new Error("Failed to create playlist");
        return;
      }

      const addVideoResponse = await dispatch(
        addVideoToPlaylist({
          videoId: video._id,
          playlistId: newPlaylistId,
        }),
      );

      if (addVideoResponse.payload?.statusCode === 200) {
        alert("Video added to playlist successfully");
      }

      nameRef.current.value = "";
      descriptionRef.current.value = "";
      setOpen(false);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create playlist", error);
    }
  };

  return (
    <div className="mt-4 hover:text-accent-2 focus:text-accent-2">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between"
        >
          <GoPlus className="text-2xl" />
          <p>Create new playlist</p>
        </button>
      )}

      {open && (
        <form className="flex flex-col gap-1" onSubmit={handleCreatePlaylist}>
          <label className="flex flex-col text-[0.8rem]">
            Name
            <input
              type="text"
              name="playListName"
              placeholder="Enter playlist name"
              ref={nameRef}
              className="mt-1 rounded-md border border-gray-300 px-2 py-1"
              required
            />
          </label>

          <label className="flex flex-col text-[0.8rem]">
            Description
            <textarea
              name="playListDescription"
              placeholder="Enter playlist description"
              ref={descriptionRef}
              className="mt-1 rounded-md border border-gray-300 px-2 py-1"
              required
            />
          </label>

          <button
            type="submit"
            className="w-fit self-end rounded-full px-3 py-1 font-semibold text-blue-500 hover:bg-blue-100"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateNewPlaylistButton;
