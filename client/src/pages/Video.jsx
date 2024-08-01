import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../actions/videoActions";
import { formatDistanceToNow } from "date-fns";

const Video = () => {
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideoById(id));
  }, [dispatch, id]);

  return (
    // <div>
    //   {JSON.stringify(videoState)}
    // </div>
    <div className="p-4">
      {video?.data ? (
        <div>
          {/* Video Player */}
          <video
            src={video.data.videoFile.url}
            controls
            className="aspect-[16/9] w-full rounded-lg object-cover"
          >
            Your browser does not support the video tag.
          </video>
          {/* Video Details */}
          <h1 className="mb-4 text-2xl font-bold">{video.data.title}</h1>
          <div className="mb-4 flex items-center">
            <img
              src={video.data.owner.avatar.url}
              alt="Owner avatar"
              className="mr-2 h-12 w-12 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                {video.data.owner.username}
              </h2>
              <p className="text-gray-500">
                {video.data.views} views •{" "}
                {formatDistanceToNow(new Date(video.data.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">{video.description}</p>
        </div>
      ) : (
        <div>No video found</div>
      )}
    </div>
  );
};

export default Video;
