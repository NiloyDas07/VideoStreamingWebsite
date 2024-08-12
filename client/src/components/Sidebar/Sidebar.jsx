import React from "react";
import SidebarItem from "./SidebarItem";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed flex h-full w-52 flex-col items-center gap-4 bg-slate-500 py-4">
        <SidebarItem
          onClick={() => {
            navigate("/add-video");
          }}
        >
          Add Video
        </SidebarItem>

        <SidebarItem
          onClick={() => {
            navigate("/add-tweet");
          }}
        >
          Add Tweet
        </SidebarItem>

        <SidebarItem
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </SidebarItem>

        <SidebarItem
          onClick={() => {
            navigate("/playlists");
          }}
        >
          Playlists
        </SidebarItem>
      </div>
    </>
  );
};

export default Sidebar;
