const bcrypt = require("bcrypt");
const { RefreshToken, tokenValidation } = require("../../models/refreshToken");
require("dotenv").config();
const { User, loginValidation } = require("../../models/User");
const { unAuth } = require("../../services/CustomErrorHandler");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");

const authController = {
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

  async logout(req, res, next) {
    const { error } = tokenValidation(req.body);
    if (error) return next(error);

    // find token
    const token = await RefreshToken.findOne({ token: req.body.token });
    if (!token) {
      return next(unAuth("Invalid refresh token"));
    }

    await RefreshToken.findOneAndDelete({ token: req.body.token });

    res.send({
      message: "successfully logedout",
    });
  },
};

module.exports = authController;
