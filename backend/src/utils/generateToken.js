const jwt = require("jsonwebtoken");

module.exports = (params) => jwt.sign(params, process.env.TOKEN_SECRET_KEY, {
  expiresIn: 86400,
});