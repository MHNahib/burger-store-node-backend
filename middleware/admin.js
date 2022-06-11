const { User } = require("../models/User");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const admin = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  if (user.role === "admin") next();
  else next(CustomErrorHandler.unAuth("Unauthorised"));
};

module.exports = admin;
