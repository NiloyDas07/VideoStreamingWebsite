import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getChannelByUsername } from "../../actions/channelActions";

import {
  ChannelDetails,
  ChannelSections,
  CoverImage,
  SubscribeButton,
  Videos,
} from "../../components";

const ChannelHome = () => {
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.channel);
  const { user } = useSelector((state) => state.auth);

  const { channelName } = useParams();

  const isChannelOwner = user?.username === channelName;

  const getChannelData = async () => {
    console.log("Channel: ", channelName);
    await dispatch(getChannelByUsername(channelName));
  };

  const handleSubscribeClick = () => {
    getChannelData(channelName);
  };

  useEffect(() => {
    getChannelData(channelName);
  }, [channelName, dispatch]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <CoverImage imageUrl={channel?.coverImage?.url} />

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <ChannelDetails />
        {!isChannelOwner && (
          <SubscribeButton
            channelId={channel?._id}
            className="text-2xl"
            onClick={handleSubscribeClick}
          />
        )}
      </div>

      <ChannelSections />
    </div>
  );
};

export default ChannelHome;
