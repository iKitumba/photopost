const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeaders.split(" ");

  if (!parts.length === 2) {
    return res.status(401).json({ message: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatted" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }

    req.user_id = decoded.id;

    return next();
  });
};
