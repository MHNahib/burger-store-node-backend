const express = require("express");
const router = express.Router();

// const registerController = require("../controllers/auth/registerController");
// const loginController = require("../controllers/auth/loginController");

const {
  registerController,
  authController,
  userController,
  refreshController,
  productController,
} = require("../controllers");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/register", registerController.register);
router.post("/login", authController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", authController.logout);

router.post("/products", [auth, admin], productController.store);
router.put("/products/:id", [auth, admin], productController.update);
router.delete("/products/:id", [auth, admin], productController.delete);

router.get("/products/", productController.getProducts);
router.get("/products/:id", productController.getSingleProduct);

module.exports = router;
