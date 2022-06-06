const express = require("express");
const router = express.Router();

const registerController = require("../controllers/auth/registerController");
const loginController = require("../controllers/auth/loginController");

router.post("/register", registerController.register);
router.post("/login", loginController.login);

module.exports = router;
