const express = require("express");
const router = express.Router();
const auth = require("./auth");

router.use("/auth", auth);

// http://localhost:3000/api/v1/auth

module.exports = router;
