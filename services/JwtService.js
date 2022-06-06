const jwt = require("jsonwebtoken");
require("dotenv").config();

class JwtService {
  static sign(payload, expiry = "60s") {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiry,
    });
  }

  static verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JwtService;
