import React, { useEffect, useRef } from "react";
import Container from "../components/Container";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../actions/authActions"; // Adjust the path as necessary
import { setError, setUser } from "../features/authSlice";

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
          className={`mx-auto w-full max-w-lg rounded-xl border border-black/10 bg-gray-100 p-10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo className="w-full text-center" />
            </span>
          </div>

          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/signup"
              className="text-primary font-medium transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" />
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
                placeholder="Email"
                required
                ref={emailRef}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" />
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
