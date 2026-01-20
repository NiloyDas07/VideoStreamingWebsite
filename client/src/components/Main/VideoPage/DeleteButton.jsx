import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";

import { Tooltip } from "../../";
import { deleteVideo } from "../../../actions/videoActions";

const DeleteButton = () => {
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);

  const navigate = useNavigate();

  const handleVideoDelete = async () => {
    if (video?._id) {
      try {
        const response = await dispatch(deleteVideo({ videoId: video._id }));

        if (deleteVideo.fulfilled.match(response)) {
          alert("Video deleted successfully");
          navigate("/");
          return;
        }

        alert("Failed to delete video! Please try again. If the problem persists, please contact support.");

        navigate("/");
      } catch (error) {
        alert("Failed to delete video! Please try again. If the problem persists, please contact support.");
      }
    }
  };

  return (
    <Tooltip tooltip={`Delete Video`}>
      <button onClick={handleVideoDelete} type="button" className={``}>
        <span className="sr-only">Delete Video</span>

        <RiDeleteBin5Line className="h-full w-full text-2xl text-red-600" />
      </button>
    </Tooltip>
  );
};

export default DeleteButton;
