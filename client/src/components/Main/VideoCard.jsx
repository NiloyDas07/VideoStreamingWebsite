import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { VideoOwnerDetails } from "../";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const VideoCard = ({ video }) => {
  return (
    <div className="flex min-w-72 max-w-[40rem] flex-1 flex-col gap-2 overflow-hidden rounded-lg text-xs">
      <Link to={`/video/${video._id}`}>
        <div className="relative">
          <img
            src={video.thumbnail.url}
            alt="Video thumbnail"
            className="aspect-[16/9] w-full rounded-lg"
          />
          <span className="absolute bottom-2 right-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white">
            {formatDuration(video.duration)}
          </span>

          <span className="sr-only">Play video: {video.title}</span>
        </div>
      </Link>

      {/* Video Details*/}
      <div className="flex gap-2 truncate">
        {/* Video Owner Image*/}
        <Link to={`/channel/${video?.owner?.username}`}>
          <img
            src={video.owner.avatar.url}
            alt="video owner"
            className="h-8 w-8 rounded-full"
          />

          <span className="sr-only">
            Visit Channel: {video?.owner?.username}
          </span>
        </Link>

        <div className="truncate">
          {/* Video Title*/}
          <Link to={`/video/${video?._id}`}>
            <h2 className="truncate text-base">{video?.title}</h2>
          </Link>

          <Link
            to={`/channel/${video?.owner?.username}`}
            className="text-gray-600 dark:text-gray-400"
          >
            <h3 className="truncate">@{video.owner.username}</h3>
            <p className="truncate">
              {video.views} views •{" "}
              {formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
