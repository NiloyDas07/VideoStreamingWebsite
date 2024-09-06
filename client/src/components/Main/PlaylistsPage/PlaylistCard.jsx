import React from "react";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist }) => {
  return (
    <Link to={`/playlist/${playlist._id}`} className="min-w-56 flex-1">
      <div key={playlist._id} className="rounded-lg bg-white p-4 shadow-lg dark:bg-slate-700">
        <h2 className="mb-2 truncate text-xl font-bold">{playlist.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{playlist.videos.length} videos</p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
