import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AvatarImage, CoverImage } from "../../";

import { getUserSubscriberCount } from "../../../services/subscribers.services";
import { Link } from "react-router-dom";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    getUserSubscriberCount()
      .then((res) => setSubscriberCount(res?.count || 0))
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, user]);

  return (
    <>
      {/* Cover Image */}
      <CoverImage imageUrl={user?.coverImage?.url} />

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* Avatar Image */}
        <AvatarImage imageUrl={user?.avatar?.url} />

        {/* User Details */}
        <div className="flex flex-1 flex-col text-center sm:text-start">
          {/* User Full Name */}
          <h1 className="text-4xl font-extrabold">{user?.fullName}</h1>

          {/* username */}
          <h2 className="text-xl text-accent-2 dark:text-accent">
            @{user?.username}
          </h2>

          {/* Subscriber Count */}
          <p className="text-xl">
            {subscriberCount} subscriber{subscriberCount === 1 ? "" : "s"}
          </p>
        </div>

        {/* Edit Profile Button */}
        <Link
          to={`/${user?.username}/edit-profile`}
          className="rounded-md bg-secondary-2 px-3 py-1 text-xl font-bold text-accent ring hover:bg-accent hover:text-secondary-2 sm:self-start"
        >
          Edit Profile
        </Link>
      </div>
    </>
  );
};

export default ProfileDetails;
