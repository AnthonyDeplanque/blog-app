const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const createToken = (payload) => {
  const dateNowForToken = Date.now() / 1000;
  const expiration = Math.floor(dateNowForToken + 60 * 60 * 24);
  const token = jwt.sign(
    { data: payload, exp: expiration },
    process.env.JWT_KEY
  );
  return token;
};

const authWithJwt = expressJwt({
  secret: process.env.JWT_KEY,
  algorithms: ["HS256"],
});

module.exports = { createToken, authWithJwt };
