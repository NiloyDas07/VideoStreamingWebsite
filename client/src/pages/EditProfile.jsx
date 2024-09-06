import React, { useRef } from "react";
import { Button, Input } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount, updateAccount } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const fullNameRef = useRef();
  const usernameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullNameRef.current.value && !usernameRef.current.value) {
      alert("No update value provided.");
      return;
    }

    dispatch(
      updateAccount({
        fullName: fullNameRef.current.value,
        username: usernameRef.current.value,
      }),
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = dispatch(deleteAccount());

        if (deleteAccount.fulfilled.match(response)) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        alert("Failed to delete account.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <h1 className="mb-4 text-3xl font-bold">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Full Name"
          ref={fullNameRef}
        />

        <Input
          label="Username"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          ref={usernameRef}
        />

        <Button type="submit" className="w-full" bgColor="bg-accent-2">
          Update
        </Button>
      </form>

      <Button
        className="w-full"
        bgColor="bg-accent-3"
        onClick={() => navigate(`/${user?.username}/change-password`)}
      >
        Change Password
      </Button>

      <Button className="w-ful" bgColor="bg-red-700" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default EditProfile;
