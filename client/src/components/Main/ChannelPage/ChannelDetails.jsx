import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AvatarImage, CoverImage, SubscribeButton } from "../../";

const ChannelDetails = () => {
  const { channel } = useSelector((state) => state.channel);

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* Avatar Image */}
        <AvatarImage imageUrl={channel?.avatar?.url} />

        {/* channel Details */}
        <div className="flex flex-1 flex-col text-center sm:text-start">
          {/* channel Full Name */}
          <h1 className="text-4xl font-extrabold">{channel?.fullName}</h1>

          {/* channelname */}
          <h2 className="text-xl text-accent-2 dark:text-accent">
            @{channel?.username}
          </h2>

          {/* Subscriber Count */}
          <p className="text-xl">
            {channel?.subscribersCount} subscriber
            {channel?.subscribersCount === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
