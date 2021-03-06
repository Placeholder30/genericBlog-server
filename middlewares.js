const jwt = require("jsonwebtoken");

exports.verifyToken = function (req, res, next) {
  const token = req.headers.token;

  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
