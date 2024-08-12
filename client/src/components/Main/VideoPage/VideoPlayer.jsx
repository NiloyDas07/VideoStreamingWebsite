import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const VideoPlayer = ({ className, ...props }) => {
  const videoUrl = useSelector((state) => state.video.video?.videoFile?.url);

  return (
    <video
      src={videoUrl}
      controls
      className="aspect-[16/9] w-full rounded-lg object-cover"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
