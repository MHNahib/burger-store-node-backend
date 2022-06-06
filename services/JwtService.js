const jwt = require("jsonwebtoken");
require("dotenv").config();

class JwtService {
  static sign(payload, expiry = "60s") {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
  }
}

module.exports = JwtService;
