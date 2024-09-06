import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../actions/videoActions";
import { CommentSection, VideoDetails, VideoPlayer } from "../components/";
import { addVideoToWatchHistory } from "../actions/userActions";

const Video = () => {
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video);

  const { id } = useParams();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (id !== video?._id) {
          const response = await dispatch(getVideoById(id));

          if (getVideoById.fulfilled.match(response)) {
            dispatch(addVideoToWatchHistory({ videoId: id }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideo();
  }, [dispatch, id]);

  return (
    <div className="p-4">
      {1 === 1 ? (
        <>
          <div>
            <VideoPlayer />

            <VideoDetails />
          </div>

          <CommentSection />
        </>
      ) : (
        <div>No video found</div>
      )}
    </div>
  );
};

export default Video;
