const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  try {
    token = token.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized");
  }
});
module.exports = verifyToken;
