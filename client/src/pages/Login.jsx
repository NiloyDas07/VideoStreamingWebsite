import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Container, Logo, Button, Input } from "../components/";

import { login, logout } from "../actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    dispatch(login({ email, password }));
  };

  // Handle loading and error states
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  if (error && error.statusCode !== 401) {
    dispatch(logout());

    return (
      <Container className="py-4 text-red-600">
        Error: {JSON.stringify(error)}
      </Container>
    );
  }

  return (
    <Container className="py-10">
      {loading && <div className="py-4">Loading...</div>}

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
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-base text-black/60 dark:text-secondary-1 dark:text-opacity-60">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium transition-all duration-200 hover:underline dark:text-secondary-1 dark:text-opacity-80"
            >
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              ref={emailRef}
              requiredStars={false}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              ref={passwordRef}
              requiredStars={false}
            />

            <Button type="submit" className="w-full bg-accent-2">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
