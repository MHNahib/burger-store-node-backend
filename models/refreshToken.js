const Joi = require("joi");
const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
});

const RefreshToken = new mongoose.model("RefreshToken", refreshTokenSchema);

const validation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports.refreshTokenSchema = refreshTokenSchema;
module.exports.RefreshToken = RefreshToken;
module.exports.tokenValidation = validation;
