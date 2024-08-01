import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Container from "../components/Container";

import { addNewVideo } from "../actions/videoActions";
import { resetVideo } from "../features/videoSlice";
import { useNavigate } from "react-router-dom";

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

    dispatch(resetVideo());

    // Create FormData object
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("videoFile", fileRef.current.files[0]);
    formData.append("thumbnail", thumbnailRef.current.files[0]);

    // Dispatch addNewVideo action and await the result
    const resultAction = await dispatch(addNewVideo(formData));

    if (addNewVideo.fulfilled.match(resultAction)) {
      // Redirect to the video page if the video is added successfully
      console.log(resultAction.payload);
      navigate(`/videos/${resultAction.payload?.data?._id}`);
    } else {
      // Handle the error if needed
      console.error(resultAction.payload);
    }
  };

  return loading ? (
    <Container>Loading...</Container>
  ) : (
    <Container className="py-4">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="mb-4 text-3xl font-bold">Add New Video</h1>
        <div className="rounded-lg bg-white p-8 shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1">
              <div>
                Title <span className="text-red-500">*</span>
              </div>
              <input
                ref={titleRef}
                type="text"
                required
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <div>
                Description <span className="text-red-500">*</span>
              </div>
              <textarea
                ref={descriptionRef}
                rows={4}
                required
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <div>
                Video File <span className="text-red-500">*</span>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="video/mp4"
                required
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <div>
                Thumbnail <span className="text-red-500">*</span>
              </div>
              <input
                ref={thumbnailRef}
                type="file"
                accept="image/png, image/jpeg"
                required
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </label>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white"
            >
              Add Video
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddVideo;
