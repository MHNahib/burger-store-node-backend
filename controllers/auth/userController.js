const { User } = require("../../models/User");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

const userController = {
  async me(req, res, next) {
    const { _id, role } = req.user;

    const user = await User.findById(_id).select("-password -__v");

    if (!user) return next(CustomErrorHandler.notFound("User Not Found"));

    res.send(user);
  },
};

module.exports = userController;
