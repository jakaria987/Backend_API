const express = require("express");
const {
  createCouponController,
  applyCouponController,
} = require("../../../controller/couponController");
const router = express.Router();

// http://localhost:3000/api/v1/coupon/create
http: router.post("/create", createCouponController);

// http://localhost:3000/api/v1/coupon/apply
http: router.post("/apply", applyCouponController);

module.exports = router;
