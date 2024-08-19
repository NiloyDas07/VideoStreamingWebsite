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
} from "./pages/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/" || "/home",
        element: <Home />,
      },
      {
        path: "/video/:id",
        element: <Video />,
      },
      {
        path: "/add-video",
        element: (
          <AuthLayout authentication={true}>
            <AddVideo />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
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
        path: "playlists",
        element: (
          <AuthLayout>
            <Playlists />
          </AuthLayout>
        ),
      },
      {
        path: "playlist/:id",
        element: (
          <AuthLayout>
            <Playlist />
          </AuthLayout>
        ),
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
