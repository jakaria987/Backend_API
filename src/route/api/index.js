const express = require("express");
const router = express.Router();
const auth = require("./auth");
const banner = require("./banner");
const category = require("./category");
const subCategory = require("./subCategory");
const product = require("./product");
const coupon = require("./coupon");
const cart = require("./cart");
const order = require("./order");

// http://localhost:3000/api/v1/auth
router.use("/auth", auth);

// http://localhost:3000/api/v1/banner
router.use("/banner", banner);

// http://localhost:3000/api/v1/category
router.use("/category", category);

// http://localhost:3000/api/v1/subCategory
router.use("/subCategory", subCategory);

// http://localhost:3000/api/v1/product
router.use("/product", product);

// http://localhost:3000/api/v1/coupon
router.use("/coupon", coupon);

// http://localhost:3000/api/v1/cart
router.use("/cart", cart);

// http://localhost:3000/api/v1/order
router.use("/order", order);

module.exports = router;
