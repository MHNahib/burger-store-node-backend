require("dotenv").config();
const { RefreshToken, tokenValidation } = require("../../models/refreshToken");
const { User } = require("../../models/User");
const { unAuth, notFound } = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");

const refreshController = {
  async refresh(req, res, next) {
    const { error } = tokenValidation(req.body);
    if (error) return next(error);

    // find token
    const token = await RefreshToken.findOne({ token: req.body.token });
    if (!token) {
      console.log(1);
      return next(unAuth("Invalid refresh token"));
    }

    // verify token
    let userId;
    try {
      const { _id } = JwtService.verify(
        token.token,
        process.env.REFRESH_SECRET
      );
      userId = _id;
    } catch (error) {
      console.log(error);
      return next(unAuth("Invalid refresh token"));
    }

    const user = await User.findOne({ _id: userId });

    if (!user) return next(notFound("No user found"));

    const accessToken = JwtService.sign(
      {
        _id: user._id,
        role: user.role,
      },
      "1h"
    );

    const refreshToken = JwtService.sign(
      { _id: user._id, role: user.role },
      "30d",
      process.env.REFRESH_SECRET
    );

    await RefreshToken.findOneAndDelete({ token: req.body.token });

    await RefreshToken.create({ token: refreshToken });

    res.json({ accessToken, refreshToken });
  },
};

module.exports = refreshController;
