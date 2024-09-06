import React from "react";
import { ProfileDetails, ProfileSections, Videos } from "../../components/";

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <ProfileDetails />
      <ProfileSections />
      <div>
        <h2 className="pb-3 text-2xl font-bold">Your Videos</h2>
        <Videos forPage="profile" />
      </div>
    </div>
  );
};

export default ProfilePage;
