import React, { useRef } from "react";
import { Button, Input } from "../components";
import { useDispatch } from "react-redux";
import { changePassword } from "../actions/userActions";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const handleSubmit = async () => {
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    if (!oldPassword.trim() || !newPassword.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await dispatch(
        changePassword({ oldPassword, newPassword }),
      );

      if (changePassword.fulfilled.match(response)) {
        alert("Password changed successfully");
      } else {
        if (response?.payload?.message === "Old password is incorrect.") {
          alert("Old password is incorrect");
          return;
        }
        alert("Failed to change password");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to change password");
    }
  };

  return (
    <div className="py-4">
      <h1 className="mb-4 text-3xl font-bold">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Old Password"
          type="text"
          name="oldPassword"
          id="oldPassword"
          placeholder="Old Password"
          ref={oldPasswordRef}
          required
        />

        <Input
          label="New Password"
          type="text"
          name="newPassword"
          id="newPassword"
          placeholder="New Password"
          ref={newPasswordRef}
          required
        />

        <Button type="submit" className="w-full" bgColor="bg-accent-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
