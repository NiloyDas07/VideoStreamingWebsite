const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

/*
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      sucess: false,
      message: error.message,
    });
  }
};

Equivalent to onst asyncHandler = (fn) => {() => {}} 

or

function asyncHandler(fn) {
  // Return a new asynchronous function
  return async function (req, res, next) {
    try {
      // Execute the passed-in function (fn) with the request, response, and next arguments
      await fn(req, res, next);
    } catch (error) {
      // If an error occurs, catch it and send a response with the error information
      res.status(error.code || 500).json({
        success: false, // Indicate that the operation was not successful
        message: error.message, // Include the error message in the response
      });
    }
  };
}
*/

export { asyncHandler };
