import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Logo, Button, Input } from "../components";
import { createAccount } from "../actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();
  const avatarRef = useRef();
  const coverImageRef = useRef();

  const [error, setError] = useState(null);
  const [passwordPattern, setPasswordPattern] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("username", usernameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("fullName", fullnameRef.current.value);

    // Check if user provided an avatar image
    if (avatarRef.current.files[0]) {
      formData.append("avatar", avatarRef.current.files[0]);
    } else {
      // Append default image from public folder
      const defaultAvatar = "/images/defaultAvatar.jpg";
      const response = await fetch(defaultAvatar);
      const blob = await response.blob();
      formData.append("avatar", blob, "default-avatar.png");
    }

    // Check if user provided a cover image
    if (coverImageRef.current.files[0]) {
      formData.append("coverImage", coverImageRef.current.files[0]);
    } else {
      // Append default image from public folder
      const defaultCoverImage = "images/defaultCoverImage.jpeg";
      const response = await fetch(defaultCoverImage);
      const blob = await response.blob();
      formData.append("coverImage", blob, "default-cover-image.png");
    }

    console.log("formData", formData);

    const resultAction = await dispatch(createAccount(formData));

    if (createAccount.fulfilled.match(resultAction)) {
      navigate("/login");
    } else {
      setError(resultAction.payload);
    }
  };

  return (
    <Container className="py-10">
      <div className="flex w-full items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg rounded-xl bg-neutral-3 p-10 text-opacity-80 ring-1 ring-black/10 dark:bg-secondary-2 dark:text-secondary-1`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo className="w-full text-center" />
            </span>
          </div>

          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create an account
          </h2>

          <p className="mt-2 text-center text-base text-black/60 dark:text-secondary-1 dark:text-opacity-60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium transition-all duration-200 hover:underline dark:text-secondary-1 dark:text-opacity-80"
            >
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full Name"
              required
              ref={fullnameRef}
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              ref={emailRef}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              minLength={8}
              required
              onChange={() => {
                setPasswordPattern(() => passwordRef.current.value);
              }}
              ref={passwordRef}
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              minLength={8}
              required
              pattern={passwordPattern}
              ref={confirmPasswordRef}
              title="Passwords do not match"
            />

            {/* Username */}
            <Input
              label="Username"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              ref={usernameRef}
            />

            {/* Avatar */}

            <Input
              label="Avatar"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              name="avatar"
              id="avatar"
              placeholder="Avatar"
              ref={avatarRef}
            />

            {/* Cover Image */}
            <Input
              label="Cover Image"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              name="coverImage"
              id="coverImage"
              placeholder="Cover Image"
              ref={coverImageRef}
            />

            <Button type="submit" className="w-full bg-accent-2">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
