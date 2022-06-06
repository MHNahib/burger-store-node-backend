const express = require("express");
const router = express.Router();

// const registerController = require("../controllers/auth/registerController");
// const loginController = require("../controllers/auth/loginController");

const {
  registerController,
  authController,
  userController,
  refreshController,
} = require("../controllers");
const auth = require("../middleware/auth");

router.post("/register", registerController.register);
router.post("/login", authController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", authController.logout);

module.exports = router;
