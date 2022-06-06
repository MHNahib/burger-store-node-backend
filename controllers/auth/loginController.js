const bcrypt = require("bcrypt");
const { RefreshToken } = require("../../models/refreshToken");
require("dotenv").config();
const { User, loginValidation } = require("../../models/User");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");

const loginController = {
  async login(req, res, next) {
    const { error } = loginValidation(req.body);
    if (error) return next(error);

    // check user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(CustomErrorHandler.notFound("User Not Found"));

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare)
      return next(
        CustomErrorHandler.wrongCredentials("Password is not matched")
      );

    const accessToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "1h"
    );

    const refreshToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "30d",
      process.env.REFRESH_SECRET
    );

    await RefreshToken.create({ token: refreshToken });

    res.json({ accessToken, refreshToken });
  },
};

module.exports = loginController;
