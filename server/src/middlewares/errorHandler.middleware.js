import { ApiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.log(err);

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, null, message));
};

export { errorHandler };
