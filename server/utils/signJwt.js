const jwt = require("jsonwebtoken");

const signJwt = (user) => {
  const { _id, isAdmin } = user;
  const role = isAdmin ? "ROLE_ADMIN" : "ROLE_USER";
  let token = jwt.sign({ _id, role }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  token = "Bearer " + token;
  return token;
};
module.exports = signJwt;
