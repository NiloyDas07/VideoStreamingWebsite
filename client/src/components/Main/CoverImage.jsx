import React, { useRef } from "react";

import { EditButton, Input } from "../";

import { updateUserCoverImage } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const CoverImage = ({ imageUrl }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("coverImage", coverImageRef.current.files[0]);

      dispatch(updateUserCoverImage(formData)).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  const coverImageRef = useRef();

  const updateForm = (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <Input
        type="file"
        label="Upload New Cover Image"
        ref={coverImageRef}
      ></Input>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent-2 p-2 text-secondary-1 hover:underline dark:bg-accent"
      >
        Upload New Cover Image
      </button>
    </form>
  );

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl">
      <img
        src={imageUrl}
        alt="Cover Image"
        className="absolute overflow-hidden rounded-xl object-cover"
      />

      <EditButton
        className="absolute bottom-2 right-2 w-8 rounded-lg border-2 border-white bg-primary p-1 text-secondary-1 hover:bg-accent hover:text-secondary-2 focus:bg-accent focus:text-secondary-2"
        label="Update Cover Image"
        form={updateForm}
      />
    </div>
  );
};

export default CoverImage;
