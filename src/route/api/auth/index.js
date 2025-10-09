const express = require("express");
const {
  signupController,
  verifyOtpController,
  loginController,
  allUsersController,
} = require("../../../controller/authController");
const {
  tokenCheckMiddleware,
  adminCheck,
} = require("../../../utils/authMiddleware");
const router = express.Router();

// http://localhost:3000/api/v1/auth/signup
router.post("/signup", signupController);

// http://localhost:3000/api/v1/auth/verify-otp
router.post("/verify-otp", verifyOtpController);

// http://localhost:3000/api/v1/auth/login
router.post("/login", loginController);

// http://localhost:3000/api/v1/auth/allUsers
router.get("/allUsers", tokenCheckMiddleware, adminCheck, allUsersController);

module.exports = router;
