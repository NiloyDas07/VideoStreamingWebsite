import React, { useRef } from "react";

import { updateUserAvatar } from "../../actions/userActions";

import { EditButton, Input } from "../";
import { useDispatch } from "react-redux";

const AvatarImage = ({ imageUrl, height = "h-32", width = "w-32" }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      console.log("formData");

      dispatch(updateUserAvatar(formData)).then(() => {
        window.location.reload();
      });
    } catch (error) {}
  };

  const avatarRef = useRef();

  const updateForm = (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <Input type="file" label="Upload New Cover Image" ref={avatarRef}></Input>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent-2 p-2 text-secondary-1 hover:underline dark:bg-accent"
      >
        Upload New Avatar
      </button>
    </form>
  );

  return (
    <div
      className={`relative ${height} ${width} overflow-hidden rounded-full border shadow-md shadow-gray-500 dark:shadow-secondary-2`}
    >
      <img
        src={imageUrl}
        alt="User Avatar"
        className="h-full w-full rounded-full object-cover"
      />

      <EditButton
        className="absolute bottom-4 right-4 w-8 rounded-lg border-2 border-white bg-primary p-1 text-secondary-1 hover:bg-accent hover:text-secondary-2 focus:bg-accent focus:text-secondary-2"
        handleClick={updateUserAvatar}
        label="Update Avatar"
        form={updateForm}
      />
    </div>
  );
};

export default AvatarImage;
