const couponModel = require("../model/coupon.model");

const createCouponController = async (req, res) => {
  try {
    let { couponCode, minPrice, amount } = req.body;

    let createCoupon = new couponModel({
      couponCode,
      minPrice,
      amount,
    });

    await createCoupon.save();
    res.status(201).json({
      success: true,
      message: "coupon created successfully",
      data: createCoupon,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const applyCouponController = (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};
module.exports = { createCouponController, applyCouponController };
