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
// to active jwt uncomment this line and comment the second line
router.get("/allUsers", tokenCheckMiddleware, adminCheck, allUsersController);
// router.get("/allUsers", allUsersController);

module.exports = router;
