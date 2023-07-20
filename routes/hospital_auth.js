const express = require("express");
const router = express.Router();

const {
  logoutController,
  refreshController,
  regController,
  loginController,
} = require("../controllers/hospitalAuth");
const { BasicAuth } = require("../middleware/signupBasicAuth");

router.post("/register", BasicAuth, regController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);
module.exports = router;
