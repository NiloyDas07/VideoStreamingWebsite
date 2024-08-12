import { useState } from "react";
import { useSelector } from "react-redux";

import { formatDistanceToNow } from "date-fns";
import ChannelDetails from "../ChannelDetails";
import SubscribeButton from "../../SubscribeButton";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import AddToPlaylistButton from "./AddToPlaylistButton";

const VideoDetails = ({ className, ...props }) => {
  const { video, loading, error } = useSelector((state) => state.video);

  const { user } = useSelector((state) => state.auth);

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      {/* Title*/}
      <h1 className="mb-4 text-2xl font-bold">{video?.title}</h1>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <ChannelDetails video={video} />
        {!(video?.owner?._id === user?._id) && (
          <SubscribeButton channelId={video?.owner?._id} className="max-w-36" />
        )}

        <LikeButton contentId={video?._id} contentType={"video"} size="2xl" />

        <ShareButton size="2xl" />

        <AddToPlaylistButton size="2xl" />
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h3 className="mb-2 text-lg font-semibold">Description</h3>
        <p className="whitespace-pre-wrap text-gray-700">
          {showMore
            ? video?.description
            : `${video?.description?.substring(0, 100)}...`}
        </p>
        <button
          onClick={toggleShowMore}
          className="text-blue-500 hover:underline"
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </>
  );
};

export default VideoDetails;
