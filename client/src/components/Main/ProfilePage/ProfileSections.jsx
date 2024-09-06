import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileSections = () => {
  const { user } = useSelector((state) => state.auth);

  const sectionItems = [
    {
      name: "Watch History",
      link: `${user?.username}/watch-history`,
      description: "View your watch history",
      bgColor: "bg-accent-3",
    },
    {
      name: "Liked Videos",
      link: `${user?.username}/liked-videos`,
      description: "View videos you liked",
      bgColor: "bg-accent-4",
    },
    {
      name: "Playlists",
      link: `${user?.username}/playlists`,
      description: "View your playlists",
      bgColor: "bg-accent-5",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8 pb-10 pt-2">
      {sectionItems.map((section) => (
        <Link
          key={section.name}
          to={section.link}
          className={`text-opacity-9 flex w-full flex-col rounded-2xl ${section.bgColor || "bg-accent-3"} p-4 text-center text-secondary-1 shadow-xl`}
        >
          <h3 className="text-2xl font-bold text-secondary-1 text-opacity-90">
            {section.name}
          </h3>
          <p className="text-lg">{section.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProfileSections;
