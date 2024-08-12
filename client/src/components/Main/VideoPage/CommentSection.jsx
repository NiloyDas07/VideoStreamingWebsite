import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllComments } from "../../../actions/commentActions";

import Comment from "./Comment";
import AddComment from "./AddComment";
import ErrorDisplay from "../ErrorDisplay";

const CommentSection = () => {
  const videoId = useSelector((state) => state.video.video.data._id);
  const { comments, loading, error } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllComments({ videoId }));
  }, []);

  return (
    <div className="flex w-full flex-col bg-white">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">Comments</h2>
      </div>
      <div className="p-4">
        <AddComment />
        {loading ? (
          <div>Loading comments...</div>
        ) : error ? (
          <ErrorDisplay error={error} />
        ) : (
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
