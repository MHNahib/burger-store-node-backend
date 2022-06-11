const path = require("path");
const multer = require("multer");
const fs = require("fs");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const { Product, productUploadValidation } = require("../models/Product");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb

// route
const productController = {
  async store(req, res, next) {
    // multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) return next(CustomErrorHandler.serverError(err.message));

      const filePath = req.file.path;

      // console.log(req.file);
      const { error } = productUploadValidation(req.body);

      // delete file if validation fials
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });

        return next(error);
      }

      const product = await Product({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        image: filePath,
      });

      await product.save();

      res.status(201).json(product);
    });
  },

  async update(req, res, next) {
    // multipart form data
    handleMultipartData(req, res, async (err) => {
      if (err) return next(CustomErrorHandler.serverError(err.message));

      let filePath;

      if (req.file) filePath = req.file.path;

      // console.log(req.file);
      const { error } = productUploadValidation(req.body);

      // delete file if validation fials
      if (error) {
        if (req.file) {
          // Delete the uploaded file
          fs.unlink(`${appRoot}/${filePath}`, (err) => {
            if (err) {
              return next(CustomErrorHandler.serverError(err.message));
            }
          });
        }
        return next(error);
      }

      const product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          price: req.body.price,
          size: req.body.size,
          ...(req.file && { image: filePath }),
        },
        { new: true }
      );

      res.status(201).json(product);
    });
  },

  async delete(req, res, mext) {
    const product = await Product.findOneAndRemove({ _id: req.params.id });
    if (!product) {
      return next(new Error("Nothing to delete"));
    }

    const imagePath = product.image;

    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
      return res.json(product);
    });
  },

  async getProducts(req, res, next) {
    const products = await Product.find();

    return res.json(products);
  },
};

module.exports = productController;
