const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      get: (image) => {
        return `${process.env.APP_URL}/${image}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Product = new mongoose.model("Product", productSchema);

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    size: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.productSchema = productSchema;
module.exports.Product = Product;
module.exports.productUploadValidation = validation;
