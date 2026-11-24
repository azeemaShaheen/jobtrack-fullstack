
function errorHandler(err, req, res, next) {
  // Handle duplicate email errors
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Email already registered",
    });
  }

  // Handle invalid data
  if (
    err.name === "ValidationError" ||
    err.name === "CastError"
  ) {
    return res.status(400).json({
      message: "Invalid application data",
    });
  }

  // Log unexpected server errors
  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
}

export default errorHandler;
