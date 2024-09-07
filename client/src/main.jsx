import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store.js";

import { AuthLayout } from "./components/";

import {
  Home,
  Video,
  AddVideo,
  Login,
  Playlists,
  Playlist,
  SignUp,
  ProfilePage,
  LikedVideos,
  WatchHistory,
  EditProfile,
  Channel,
  ChannelHome,
  ChannelVideos,
  ChannelPlaylists,
  ChangePassword,
  DemoLogin,
  ProfileHome,
} from "./pages/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/" || "home",
        element: <Home />,
      },
      {
        path: "video/:id",
        element: <Video />,
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "demo-login",
        element: (
          <AuthLayout authentication={false}>
            <DemoLogin />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: ":username",
        element: (
          <AuthLayout authentication={true}>
            <ProfilePage />
          </AuthLayout>
        ),
        children: [
          {
            path: "",
            element: <ProfileHome />,
          },
          {
            path: "add-video",
            element: <AddVideo />,
          },
          {
            path: ":edit-profile",
            element: <EditProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "playlists",
            element: <Playlists />,
          },
          {
            path: "liked-videos",
            element: <LikedVideos />,
          },
          {
            path: "watch-history",
            element: <WatchHistory />,
          },
        ],
      },

      {
        path: "playlist/:id",
        element: (
          <AuthLayout>
            <Playlist />
          </AuthLayout>
        ),
      },

      // Channel Routes
      {
        path: "channel/:channelName/",
        element: <Channel />,
        children: [
          {
            path: "",
            element: <ChannelHome />,
          },
          {
            path: "videos",
            element: <ChannelVideos />,
          },
          {
            path: "playlists",
            element: <ChannelPlaylists />,
          },
        ],
      },

      // For unknown routes
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  // </React.StrictMode>,
);
