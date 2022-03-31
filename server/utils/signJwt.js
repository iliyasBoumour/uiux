const jwt = require("jsonwebtoken");

const signJwt = (user) => {
  const { _id, isAdmin, fname, lname } = user;
  const role = isAdmin ? "ROLE_ADMIN" : "ROLE_USER";
  let token = jwt.sign({ _id, role, fname, lname }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  token = "Bearer " + token;
  return token;
};
module.exports = signJwt;
