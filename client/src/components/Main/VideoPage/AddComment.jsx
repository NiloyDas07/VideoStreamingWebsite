import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewComment } from "../../../actions/commentActions";

const AddComment = () => {
  const newCommentRef = useRef(null);

  const videoId = useSelector((state) => state.video.video.data._id);

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
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.pexels.com/photos/1172650/pexels-photo-1172650.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="User avatar"
        />
      </div>
      <div className="flex-grow">
        <textarea
          ref={newCommentRef}
          className="w-full rounded border p-2"
          placeholder="Add a public comment..."
        />
        <div className="mt-2 flex justify-end">
          <button
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
