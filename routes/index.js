const express = require("express");
const router = express.Router();

// const registerController = require("../controllers/auth/registerController");
// const loginController = require("../controllers/auth/loginController");

const {
  registerController,
  loginController,
  userController,
  refreshController,
} = require("../controllers");
const auth = require("../middleware/auth");

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);

module.exports = router;
