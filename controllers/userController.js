const User = require("../models/User");

exports.register = async (req, res) => {
  const data = req.body;
  console.log(req.body);
  const user = new User(data);
  const result = await user.register();

  res.status(200).json({
    message: "You've succesfully registered",
  });
};

exports.login = async (req, res) => {
  const data = req.body;
  const user = new User(data);
  let result = await user.login();
  result
    ? res.status(200).json({
        message: "You've succesfully Logged in",
      })
    : res.status(403).json({
        message: "please enter a valid email and or password",
      });
};
