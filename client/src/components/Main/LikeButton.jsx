import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axios.util";
import { handleRequestWithTokenRefresh } from "../../utils/tokenRefresh";
import Tooltip from "../Tooltip";

const LikeButton = ({ contentId, contentType, size = "xl" }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { user } = useSelector((state) => state.auth);

  const fetchLikeCount = async () => {
    try {
      const response = await handleRequestWithTokenRefresh(
        async () =>
          await axiosInstance.get(
            `likes/count/${contentId}?contentType=${contentType}`,
          ),
      );

      if (response instanceof Error || response?.error) throw response;

      setLikeCount(response.data?.data);
    } catch (error) {
      // console.log(error);
    }
  };

  const toggleLike = async () => {
    if (!user?._id) {
      alert("Please login to like content.");
      return;
    }

    // Update first for smoother user experience.
    setLiked((prevState) => !prevState);
    try {
      const response = await handleRequestWithTokenRefresh(
        async () =>
          await axiosInstance.post(`likes/toggle/${contentType}/${contentId}/`),
      );

      if (!response.status === 200) setLiked((prevState) => !prevState);

      if (response instanceof Error || response?.error) throw response;

      // Update like count after toggling
      fetchLikeCount();
    } catch (error) {
      setLiked((prevState) => !prevState);
      console.log(error);
    }
  };

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        if (user?._id) {
          const response = await handleRequestWithTokenRefresh(
            async () =>
              await axiosInstance.get(
                `/likes/${contentId}?contentType=${contentType}`,
              ),
          );

          if (response instanceof Error || response?.error) throw response;

          if (response.status === 200) {
            if (response.data?.data) setLiked(true);
            else setLiked(false);
          } else {
            setLiked(false);
          }
        }
      } catch (error) {
        setLiked(false);
        console.log(error);
      }
    };

    checkIfLiked();
  }, [contentId, contentType, user?._id]);

  useEffect(() => {
    fetchLikeCount();
  }, [contentId, contentType, liked]);

  return (
    <Tooltip tooltip={liked ? "Unlike" : "Like"}>
      {liked ? (
        <button type="button" className="flex items-center gap-1">
          <span className="sr-only">Like</span>
          <AiFillLike
            className={`cursor-pointer text-${size} hover:text-accent-2 focus:text-accent-2`}
            onClick={toggleLike}
          />
          {likeCount > 0 && <span className="font-semibold">{likeCount}</span>}
        </button>
      ) : (
        <button type="button" className="flex items-center gap-1">
          <span className="sr-only">Like</span>
          <AiOutlineLike
            className={`cursor-pointer text-${size} hover:text-accent focus:text-accent-2`}
            onClick={toggleLike}
          />
          {likeCount > 0 && <span className="font-semibold">{likeCount}</span>}
        </button>
      )}
    </Tooltip>
  );
};

export default LikeButton;
