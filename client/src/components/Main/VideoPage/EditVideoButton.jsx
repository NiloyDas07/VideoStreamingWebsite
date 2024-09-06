import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { EditButton, Input, Textarea, Tooltip } from "../../";

import { updateVideo } from "../../../actions/videoActions";

const EditVideoButton = () => {
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const thumbnailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !titleRef.current.value.trim() &&
      !descriptionRef.current.value.trim() &&
      !thumbnailRef.current.files[0]
    ) {
      alert("No update value provided. Please provide at least one value.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", titleRef.current.value);
      formData.append("description", descriptionRef.current.value);
      formData.append("thumbnail", thumbnailRef.current.files[0]);

      console.log("formData", formData, video?._id);

      const response = await dispatch(
        updateVideo({ videoId: video?._id, data: formData }),
      );

      if (updateVideo.fulfilled.match(response)) {
        console.log(response);
        alert("Video updated successfully");
      } else {
        console.error("Failed to update video: ", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateForm = (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        type="file"
        label="Thumbnail"
        requiredStars={false}
        ref={thumbnailRef}
      />

      <Input
        type="text"
        label="Video Title"
        ref={titleRef}
        placeholder={"New Video Title"}
        requiredStars={false}
      />

      <Textarea
        label="Video Description"
        ref={descriptionRef}
        placeholder="New Video Description"
        requiredStars={false}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-accent-2 p-2 text-secondary-1 hover:underline dark:bg-accent"
      >
        Update
      </button>
    </form>
  );

  return (
    <Tooltip tooltip={`Edit Video`}>
      <EditButton size="2xl" form={updateForm} label="Update Video Details" />
    </Tooltip>
  );
};

export default EditVideoButton;
