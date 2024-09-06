import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../../actions/commentActions";

import { Input } from "../../";

const AddComment = () => {
  const newCommentRef = useRef(null);

  const videoId = useSelector((state) => state.video.video?._id);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleAddComment = async () => {
    const newComment = newCommentRef.current.value;
    if (newComment.trim()) {
      try {
        await dispatch(
          addNewComment({ videoId, content: newComment }),
        ).unwrap();

        // Reset the input field
        newCommentRef.current.value = "";
      } catch (error) {
        if (error.statusCode === 401) {
          alert("Please login to add comments");
          return;
        }
        alert(`Failed to add comment: ${error.message}`);
      }
    }
  };

  return (
    <div className="mb-4 flex items-start space-x-4">
      <div className="h-10 w-10">
        <img
          src={user?.avatar?.url || "/images/defaultAvatar.jpg"}
          alt="comment owner avatar"
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="flex-grow">
        <Input
          type="textarea"
          ref={newCommentRef}
          className="w-full rounded border p-2"
          placeholder="Add a public comment..."
        />
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={handleAddComment}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
