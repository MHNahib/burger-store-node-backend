const bcrypt = require("bcrypt");

const { User, userValidation } = require("../../models/User");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const JwtService = require("../../services/JwtService");

const registerController = {
  async register(req, res, next) {
    const { error } = userValidation(req.body);
    if (error) return next(error);

    let user = await User.exists({ email: req.body.email });

    if (user)
      return next(
        CustomErrorHandler.alreadyExists("This email is already taken.")
      );

    // password bcrypt

    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });

    await user.save();

    const accessToken = JwtService.sign(
      {
        _id: user._id,
        role: user.role,
      },
      "1h"
    );

    res.json({ accessToken });
  },
};

module.exports = registerController;
