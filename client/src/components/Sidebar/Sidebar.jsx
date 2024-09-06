import React, { useEffect, useRef } from "react";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/UiSlice";

import { RiVideoAddFill } from "react-icons/ri";
import { FaUser, FaHome } from "react-icons/fa";
import { PiPlaylistBold } from "react-icons/pi";
import { IoLogIn } from "react-icons/io5";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, menuButtonClicked } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const sidebarRef = useRef();

  const username = user?.username;

  // To make sure that the sidbar is always open for larger screens.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && !sidebarOpen) {
        dispatch(toggleSidebar());
      }
    };

    // Attach event listener to window resize
    window.addEventListener("resize", handleResize);

    // Initial check when the component mounts
    handleResize();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, sidebarOpen]);

  const sidebarItems = [
    {
      name: "Home",
      icon: <FaHome className={`h-full w-full`} />,
      path: "/",
    },
    {
      name: "Add Video",
      icon: <RiVideoAddFill className={`h-full w-full`} />,
      path: `/${username}/add-video`,
    },
    {
      name: "Profile",
      icon: <FaUser className={`h-full w-full`} />,
      path: `/${username}`,
    },
    {
      name: "Playlists",
      icon: <PiPlaylistBold className="h-full w-full" />,
      path: `/${username}/playlists`,
    },
    {
      name: "Demo Account Login",
      icon: <IoLogIn className="h-full w-full" />,
      path: "/demo-login",
    },
  ];

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed z-40 min-h-full border-r border-neutral-2 bg-primary bg-opacity-90 py-4 backdrop-blur-[3px] transition-[width] duration-500 ease-in-out dark:border-neutral-1 md:w-52 md:bg-neutral-3 md:dark:bg-primary ${sidebarOpen ? "w-full overflow-hidden" : "w-0 overflow-hidden"}`}
        inert={!sidebarOpen ? "true" : undefined}
      >
        <ul className="flex h-full w-fit cursor-default flex-col items-center gap-4 text-secondary-1 md:text-primary md:dark:text-secondary-1">
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              className="w-full"
              onClick={() => dispatch(toggleSidebar())}
            >
              <SidebarItem name={item.name} path={item.path} icon={item.icon} />
            </li>
          ))}
        </ul>
      </div>
      <div className={`md:mr-52`}></div>
    </>
  );
};

export default Sidebar;
