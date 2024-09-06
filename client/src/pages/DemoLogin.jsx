import React, { useState } from "react";

import { Button, Input } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setAgreed((prevAgreed) => !prevAgreed);
  };

  const handleProceed = async () => {
    if (agreed) {
      try {
        const response = await dispatch(
          login({ email: "demo@vsw.com", password: "demoPasswordVsw01" }),
        );

        if (login.fulfilled.match(response)) {
          console.log(`Login successful`);
          navigate("/");
        } else {
          alert(`Failed to login: ${response?.error?.message}`);
        }
      } catch (error) {
        alert(`Failed to login: ${error?.message}`);
      }
    } else {
      alert(
        "Please confirm that you have read and agree to the guidelines before proceeding.",
      );
    }
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <h2 className="mb-4 text-2xl font-semibold">Demo Account Guidelines</h2>
      <p className="mb-4">
        Welcome to the demo account for our video streaming platform! We're
        excited to offer you a chance to explore all the features. However,
        please keep the following guidelines in mind while using this demo:
      </p>

      <ul className="mb-4 flex list-disc flex-col gap-2 pl-6">
        <li>
          <strong>Respect the Community:</strong> Please avoid uploading any
          offensive, inappropriate, or illegal content. This includes but is not
          limited to videos containing hate speech, explicit material, violence,
          or anything that violates our community standards.
        </li>

        <li>
          <strong>Test, Don’t Abuse:</strong> The demo is intended for testing
          features like video uploading, creating playlists, and interacting
          with content. Please refrain from excessive spamming, trolling, or
          misuse of the platform.
        </li>

        <li>
          <strong>Data Usage:</strong> Avoid uploading copyrighted or
          unauthorized content without permission. Please ensure any video you
          upload in the demo is either your own or something you have rights to
          share.
        </li>

        <li>
          <strong>Respect Privacy:</strong> Do not upload personal information
          or private content related to yourself or others without explicit
          consent.
        </li>

        <li>
          <strong>Temporary Content:</strong> Any content you upload may be
          removed after a certain period as part of our demo policy. This
          account is reset periodically to maintain a clean testing environment.
        </li>

        <li>
          <strong>Compliance:</strong> By using this demo account, you agree to
          abide by the terms and conditions of the platform. Any misuse may
          result in termination of demo access.
        </li>
      </ul>

      <p className="mb-4">
        Your participation helps us improve the platform! Let’s keep this space
        respectful and enjoyable for everyone.
      </p>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="agree">
          I have read and agree to the guidelines and terms of usage for the
          demo account.
        </label>
      </div>

      <Button
        onClick={handleProceed}
        className={`rounded px-4 py-2 text-white`}
        bgColor={`${agreed ? "bg-accent-2" : "bg-gray-200"}`}
      >
        Proceed to Demo
      </Button>
    </div>
  );
};

export default DemoLogin;
