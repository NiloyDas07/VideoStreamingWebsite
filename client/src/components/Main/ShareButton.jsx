import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import Tooltip from "../Tooltip";

const ShareButton = ({ size = "xl", className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      // Used to show the link copied notification.
      setCopied(true);

      // Reset copied state after 0.6 seconds
      setTimeout(() => setCopied(false), 600);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <Tooltip tooltip="Share this video">
      <div className={`${className} relative`}>
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center"
        >
          <IoShareSocial
            className={`text-${size} hover:text-accent focus:text-accent-2`}
          />
          <span className="sr-only">Share this video</span>
        </button>

        {copied && (
          <span className="absolute -left-20 -top-4 -translate-y-1/2 transform rounded bg-green-500 px-2 py-1 text-white shadow">
            Video Link copied!
          </span>
        )}
      </div>
    </Tooltip>
  );
};

export default ShareButton;
