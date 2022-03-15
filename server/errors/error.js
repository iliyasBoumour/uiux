const routeNoteFound = (req, res) => {
  res.status(404);
  throw new Error("Not Found");
};

const catchErrors = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    statusCode,
    stack: err.stack,
  });
};
module.exports = { routeNoteFound, catchErrors };
