import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import Video from "./pages/Video.jsx";
import AddVideo from "./pages/AddVideo.jsx";
import Login from "./pages/Login.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Playlists from "./pages/Playlists.jsx";
import Playlist from "./pages/Playlist.jsx";

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
