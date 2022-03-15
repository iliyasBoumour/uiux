const jwt = require("jsonwebtoken");

const signJwt = (user) => {
  const { _id } = user;
  let token = jwt.sign({ _id }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  token = "Bearer " + token;
  return token;
};
module.exports = signJwt;
