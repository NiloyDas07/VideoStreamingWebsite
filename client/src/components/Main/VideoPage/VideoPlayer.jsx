import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axios.util";
import { handleRequestWithTokenRefresh } from "../../../utils/tokenRefresh";

const VideoPlayer = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const videoUrl = useSelector((state) => state.video.video?.videoFile?.url);
  const videoId = useSelector((state) => state.video.video?._id);

  const videoRef = useRef(null);

  const [viewIncreased, setViewIncreased] = useState(false);
  const [totalTimeViewed, setTotalTimeViewed] = useState(0);

  useEffect(() => {
    const incrementViewCount = async (videoId) => {
      try {
        const response = await handleRequestWithTokenRefresh(
          async () => await axiosInstance.patch(`/videos/increment-views/${videoId}`),
        );

        if (response instanceof Error || response?.error) throw response;

        return response?.data?.data;
      } catch (error) {
        return error;
      }
    };

    if (viewIncreased || !videoUrl || !videoId) return;

    const videoElement = videoRef.current;
    let animationFrameId;
    let startTime = null;

    const removeEventListeners = () => {
      videoElement.removeEventListener("play", startTracking);
      videoElement.removeEventListener("pause", stopTracking);
      videoElement.removeEventListener("ended", stopTracking);
    };

    const trackTime = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const timeElapsed = timestamp - startTime;

      if (!videoElement.paused) {
        setTotalTimeViewed((prevTime) => {
          const newTotalTime = prevTime + timeElapsed;
          const newTotalTimeInSeconds = newTotalTime / 1000;

          if (
            newTotalTimeInSeconds >= videoElement.duration * 0.95 ||
            newTotalTimeInSeconds >= 30
          ) {
            const res = incrementViewCount(videoId);
            console.log(res);
            setViewIncreased(true);
            removeEventListeners();
          }

          return newTotalTime;
        });
        startTime = timestamp; // Reset startTime for next frame
      }

      animationFrameId = requestAnimationFrame(trackTime);
    };

    const startTracking = () => {
      startTime = null; // Reset startTime when tracking starts
      animationFrameId = requestAnimationFrame(trackTime);
    };

    const stopTracking = () => {
      cancelAnimationFrame(animationFrameId);
    };

    if (videoElement) {
      videoElement.addEventListener("play", startTracking);
      videoElement.addEventListener("pause", stopTracking);
      videoElement.addEventListener("ended", stopTracking);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoElement) {
        removeEventListeners();
      }
    };
  }, [dispatch, videoId, viewIncreased, videoUrl]);

  return (
    <video
      src={videoUrl}
      ref={videoRef}
      controls
      className="aspect-[16/9] w-full rounded-lg object-cover"
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
