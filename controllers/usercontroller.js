const User = require("../models/User");

exports.register = async (req, res) => {
  const data = req.body;
  const user = new User(data);
  const result = await user.register();
  console.log(data);
  res.status(200).json({
    message: "You've succesfully registered",
  });
};
