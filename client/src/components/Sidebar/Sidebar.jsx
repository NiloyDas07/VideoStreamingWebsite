import React, { useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/UiSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state) => state.ui);

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
      name: "Add Video",
      icon: (isActive) => (
        <svg
          className={`h-full w-full ${isActive ? "text-accent dark:text-accent-2" : ""}`}
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke=""
        >
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.06935 5.00839C2 5.37595 2 5.81722 2 6.69975V13.75C2 17.5212 2 19.4069 3.17157 20.5784C4.34315 21.75 6.22876 21.75 10 21.75H14C17.7712 21.75 19.6569 21.75 20.8284 20.5784C22 19.4069 22 17.5212 22 13.75V11.5479C22 8.91554 22 7.59935 21.2305 6.74383C21.1598 6.66514 21.0849 6.59024 21.0062 6.51946C20.1506 5.75 18.8345 5.75 16.2021 5.75H15.8284C14.6747 5.75 14.0979 5.75 13.5604 5.59678C13.2651 5.5126 12.9804 5.39471 12.7121 5.24543C12.2237 4.97367 11.8158 4.56578 11 3.75L10.4497 3.19975C10.1763 2.92633 10.0396 2.78961 9.89594 2.67051C9.27652 2.15704 8.51665 1.84229 7.71557 1.76738C7.52976 1.75 7.33642 1.75 6.94975 1.75C6.06722 1.75 5.62595 1.75 5.25839 1.81935C3.64031 2.12464 2.37464 3.39031 2.06935 5.00839ZM12 11C12.4142 11 12.75 11.3358 12.75 11.75V13H14C14.4142 13 14.75 13.3358 14.75 13.75C14.75 14.1642 14.4142 14.5 14 14.5H12.75V15.75C12.75 16.1642 12.4142 16.5 12 16.5C11.5858 16.5 11.25 16.1642 11.25 15.75V14.5H10C9.58579 14.5 9.25 14.1642 9.25 13.75C9.25 13.3358 9.58579 13 10 13H11.25V11.75C11.25 11.3358 11.5858 11 12 11Z"
              fill="currentColor"
            ></path>{" "}
          </g>
        </svg>
      ),
      path: "/add-video",
    },
    // {
    //   name: "Add Tweet",
    //   icon: ({ isActive }) => <svg></svg>,
    //   path: "/add-tweet",
    // },
    {
      name: "Profile",
      icon: ({ isActive }) => (
        <svg
          className={`h-full w-full ${isActive ? "text-accent dark:text-accent-2" : ""} `}
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke=""
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      ),
      path: "/dashboard",
    },
    {
      name: "Playlists",
      icon: ({ isActive }) => (
        <svg
          className={`h-full w-full ${isActive ? "text-accent dark:text-accent-2" : ""} `}
          width="64px"
          height="64px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke=""
        >
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.75 6C15.75 6.41421 15.4142 6.75 15 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H15C15.4142 5.25 15.75 5.58579 15.75 6Z"
              fill="currentColor"
            ></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.75 10C13.75 10.4142 13.4142 10.75 13 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H13C13.4142 9.25 13.75 9.58579 13.75 10Z"
              fill="currentColor"
            ></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.75 14C9.75 14.4142 9.41421 14.75 9 14.75H3C2.58579 14.75 2.25 14.4142 2.25 14C2.25 13.5858 2.58579 13.25 3 13.25H9C9.41421 13.25 9.75 13.5858 9.75 14Z"
              fill="currentColor"
            ></path>{" "}
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.75 18C8.75 18.4142 8.41421 18.75 8 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H8C8.41421 17.25 8.75 17.5858 8.75 18Z"
              fill="currentColor"
            ></path>{" "}
            <path
              d="M17 7.25C17.4142 7.25 17.75 7.58579 17.75 8C17.75 9.79493 19.2051 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75C19.7428 12.75 18.5997 12.2616 17.75 11.4641V16.5C17.75 18.2949 16.2949 19.75 14.5 19.75C12.7051 19.75 11.25 18.2949 11.25 16.5C11.25 14.7051 12.7051 13.25 14.5 13.25C15.1443 13.25 15.7449 13.4375 16.25 13.7609V8C16.25 7.58579 16.5858 7.25 17 7.25Z"
              fill="currentColor"
            ></path>{" "}
          </g>
        </svg>
      ),
      path: "/playlists",
    },
  ];

  return (
    <>
      <div
        className={`fixed z-40 h-full border-r border-neutral-2 bg-primary bg-opacity-90 py-4 backdrop-blur-[3px] transition-[width] duration-500 ease-in-out dark:border-neutral-1 md:w-52 md:bg-neutral-3 md:dark:bg-primary ${sidebarOpen ? "w-full overflow-hidden" : "w-0 overflow-hidden"}`}
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
