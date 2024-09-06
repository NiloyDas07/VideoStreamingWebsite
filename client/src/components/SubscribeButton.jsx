import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "./";
import { axiosInstance } from "../utils/axios.util";
import { handleRequestWithTokenRefresh } from "../utils/tokenRefresh";

const SubscribeButton = ({ channelId, onClick, className, ...props }) => {
  const { user } = useSelector((state) => state.auth);

  const [subscribed, setSubscribed] = useState(false);

  async function toggleSubscription() {
    // Users must be logged in to subscribe.
    if (!user) {
      alert("Please login to subscribe");
      return;
    }

    // Users can't subscribe to their own channel.
    if (channelId === user._id) {
      alert("Can't subscribe to your own channel");
      return;
    }

    try {
      // If subscription exists, delete it, else create it.
      // Returns the updated subscription if subscription is created. Returns false if subscription is deleted.
      const response = await handleRequestWithTokenRefresh(
        async () =>
          await axiosInstance.post(`/subscriptions/channel/${channelId}`),
      );

      if (response instanceof Error || response?.error) throw response;

      setSubscribed(response.data?.data ? true : false);

      if (onClick) onClick();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Can't subscribe to your own channel");
      } else {
        console.error("Subscription failed: ", error);
      }
    }
  }

  useEffect(() => {
    async function checkSubscription() {
      if (user) {
        try {
          const response = await handleRequestWithTokenRefresh(
            async () =>
              await axiosInstance.get(`/subscriptions/channel/${channelId}`),
          );

          if (response instanceof Error || response?.error) throw response;

          setSubscribed(response.data?.data ? true : false);
        } catch (error) {
          console.error("Failed to check subscription status: ", error);
          setSubscribed(false);
        }
      } else {
        setSubscribed(false);
      }
    }

    // Check if user is subscribed to the channel. Mainly used when the component is rendered for the first time.
    checkSubscription();
  }, [user, channelId]);

  return (
    <Button
      bgColor={subscribed ? "bg-black" : "bg-red-600"}
      borderRadius="rounded-full"
      className={`${className}`}
      onClick={toggleSubscription}
      {...props}
    >
      {subscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
