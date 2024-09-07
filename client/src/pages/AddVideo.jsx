import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../components/Container";

import { addNewVideo } from "../actions/videoActions";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "../components";

const AddVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.video);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();
  const thumbnailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("videoFile", fileRef.current.files[0]);
    formData.append("thumbnail", thumbnailRef.current.files[0]);

    // Dispatch addNewVideo action and await the result
    const response = await dispatch(addNewVideo(formData));

    if (addNewVideo.fulfilled.match(response)) {
      // Redirect to the video page if the video is added successfully
      console.log(response.payload);
      navigate(`/video/${response.payload?.data?._id}`);
    } else {
      // Handle the error if needed
      console.error(response.payload);
    }
  };

  return loading ? (
    <Container>Loading...</Container>
  ) : (
    <Container className="py-4">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="mb-6 text-3xl font-bold">Add New Video</h1>
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-secondary-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <Input
              label="Title"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required
              ref={titleRef}
            />

            {/* Description */}
            <Textarea
              label="Description"
              type="textarea"
              name="description"
              id="description"
              rows={4}
              placeholder="Description"
              required
              ref={descriptionRef}
            />

            {/* Video File */}
            <Input
              label="Video File"
              type="file"
              accept="video/mp4"
              name="videoFile"
              id="videoFile"
              required
              ref={fileRef}
            />

            {/* Thumbnail */}
            <Input
              label="Thumbnail"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              name="thumbnail"
              id="thumbnail"
              required
              ref={thumbnailRef}
            />

            <Button type="submit" className="w-full bg-accent-2">
              Add Video
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddVideo;
