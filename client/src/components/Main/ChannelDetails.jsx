import { formatDistanceToNow } from "date-fns";
import React from "react";

const ChannelDetails = ({ video, className, ...props }) => {
  return (
    <div className="flex items-center truncate">
      <img
        src={video.owner.avatar.url}
        alt="Owner avatar"
        className="mr-2 h-12 w-12 rounded-full"
      />
      <div className="truncate">
        <h2 className="truncate text-xl font-semibold">
          {video.owner.username}
        </h2>
        <p className="truncate text-gray-500">
          {video.views} views •{" "}
          {formatDistanceToNow(new Date(video.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default ChannelDetails;
