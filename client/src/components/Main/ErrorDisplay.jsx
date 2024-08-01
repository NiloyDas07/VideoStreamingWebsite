import React from "react";

const ErrorDisplay = ({ error }) => {
  let display;

  if (error.statusCode === 401) {
    display = `401: Unauthorized Access`;
  }
  return (
    <h1 className="flex h-full items-center justify-center text-center text-4xl font-black text-gray-700">
      {display}
    </h1>
  );
};

export default ErrorDisplay;
