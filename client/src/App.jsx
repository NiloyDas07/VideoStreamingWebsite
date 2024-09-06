import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { getCurrentUser } from "./actions/userActions";

import { Container, Header, Sidebar } from "./components/";
import { setTheme } from "./features/UiSlice";

function App() {
  const dispatch = useDispatch();

  const { theme, sidebarOpen } = useSelector((state) => state.ui);

  // Event listener for system theme preference.
  useEffect(() => {
    const handleChange = (e) => {
      dispatch(setTheme(e.matches ? "dark" : "light"));
    };

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  // Set the theme for the entire website.
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    // Fetch current user to check if user is logged in.
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-grow flex-col bg-white font-inter text-primary dark:bg-primary dark:text-white">
      <Header />
      <div className="mt-[55px] flex h-full w-full gap-4">
        {<Sidebar />}
        {}
        <main className="w-full">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default App;
