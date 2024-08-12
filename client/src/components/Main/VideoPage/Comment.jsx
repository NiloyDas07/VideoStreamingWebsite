import React from "react";
import { formatDistanceToNow } from "date-fns";
import LikeButton from "../LikeButton";

const Comment = ({ comment, ...props }) => {
  return (
    <div key={comment._id} className="mb-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={comment.owner.avatar.url}
            alt="Commenter avatar"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="text-sm font-medium">{comment.owner.username}</div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="mt-2 text-gray-600">{comment.content}</div>
          <div className="mt-2 flex space-x-2">
            <LikeButton contentId={comment._id} contentType={"comment"} />
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default Comment;
