import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

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
        </div>
      </Link>
      <div className="flex gap-2">
        <img
          src={video.owner.avatar.url}
          alt="video owner"
          className="h-8 w-8 rounded-full"
        />
        <div className="overflow-hidden">
          <h2 className="truncate text-base">{video.title}</h2>
          <div>
            <h3>{video.owner.username}</h3>
            <p>
              {video.views} views •{" "}
              {formatDistanceToNow(new Date(video.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
