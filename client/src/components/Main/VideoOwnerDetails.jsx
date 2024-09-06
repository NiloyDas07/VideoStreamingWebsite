import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoOwnerDetails = ({ video, className, ...props }) => {
  const { user } = useSelector((state) => state.auth);

  const linkTo =
    user?._id === video?.owner?._id
      ? "/profile"
      : `/channel/${video?.owner?.username}`;

  return (
    <Link to={linkTo} className="flex items-center truncate">
      <img
        src={video?.owner?.avatar?.url}
        alt="Owner avatar"
        className="mr-2 h-12 w-12 rounded-full"
      />
      <div className="truncate">
        <h2 className="truncate text-xl font-semibold">
          {video?.owner?.username}
        </h2>
        <p className="truncate text-gray-500">
          {video?.views} views •{" "}
          {formatDistanceToNow(new Date(video?.createdAt || 0), {
            addSuffix: true,
          })}
        </p>
      </div>
    </Link>
  );
};

export default VideoOwnerDetails;
