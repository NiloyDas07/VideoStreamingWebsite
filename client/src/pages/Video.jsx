import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById } from "../actions/videoActions";
import CommentSection from "../components/Main/VideoPage/CommentSection";
import VideoPlayer from "../components/Main/VideoPage/VideoPlayer";
import VideoDetails from "../components/Main/VideoPage/VideoDetails";

const Video = () => {
  const dispatch = useDispatch();
  const { video, loading, error } = useSelector((state) => state.video);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideoById(id));
  }, [dispatch, id]);

  return (
    <div className="p-4">
      {video ? (
        <>
          <div>
            <VideoPlayer  />

            <VideoDetails />
          </div>
          {/* <CommentSection /> */}
        </>
      ) : (
        <div>No video found</div>
      )}
    </div>
  );
};

export default Video;
