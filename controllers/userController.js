const User = require("../models/User");

exports.register = async (req, res) => {
  const data = req.body;
  const user = new User(data);
  const result = await user.register();
  result
    ? res.status(201).json({
        message: "You've succesfully registered",
      })
    : res.status(401).json({
        message: "please provide valid details",
      });
};

exports.login = async (req, res) => {
  const data = req.body;
  const user = new User(data);
  const result = await user.login();
  result
    ? res.status(200).json({
        message: "You've succesfully Logged in",
      })
    : res.status(403).json({
        message: "please enter a valid email and or password",
      });
};

exports.createpost = (req, res) => {
  res.status(200).json({
    message: "welcome, create a post",
  });
};
