const CustomErrorHandler = require("../services/CustomErrorHandler");
const JwtService = require("../services/JwtService");

const auth = (req, res, next) => {
  const { accesstoken } = req.headers;
  if (!accesstoken) return next(CustomErrorHandler.unAuth("unauthorized"));

  const user = JwtService.verify(accesstoken);
  req.user = user;

  next();
};

module.exports = auth;
