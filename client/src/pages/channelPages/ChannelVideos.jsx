import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Videos } from "../../components";
import { getChannelByUsername } from "../../actions/channelActions";
import { useParams } from "react-router-dom";

const ChannelVideos = () => {
  const dispatch = useDispatch();
  const { channel } = useSelector((state) => state.channel);

  const { channelName } = useParams();

  useEffect(() => {
    // Fetch Channel Details if not available. Eg. when user reloads the page.
    if (!channel) {
      dispatch(getChannelByUsername(channelName));
    }
  }, [channel]);

  return (
    <div className="py-4">
      <Videos forPage="channel" />
    </div>
  );
};

export default ChannelVideos;
