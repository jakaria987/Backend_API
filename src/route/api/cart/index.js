const express = require("express");
const {
  addToCartController,
  getAllCartsController,
  singleUserCartController,
  updateQuantityController,
} = require("../../../controller/cartController");
const router = express.Router();

// http://localhost:3000/api/v1/cart/addToCart
http: router.post("/addToCart", addToCartController);

// http://localhost:3000/api/v1/cart/getAllCarts
http: router.get("/getAllCarts", getAllCartsController);

// http://localhost:3000/api/v1/cart/singleUserCart
http: router.get("/singleUserCart/:id", singleUserCartController);

// http://localhost:3000/api/v1/cart/updateQuantity
router.patch("/updateQuantity/:id", updateQuantityController);

module.exports = router;
