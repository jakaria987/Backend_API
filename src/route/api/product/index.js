const express = require("express");
const {
  createProductController,
  createVariantController,
  allProductController,
  deleteProductController,
  latestProductController,
} = require("../../../controller/productController");
const createUploader = require("../../../utils/upload");
const router = express.Router();
const upload = createUploader("./uploads");

// http://localhost:3000/api/v1/product/createProduct
router.post(
  "/createProduct",
  upload.array("productImage"),
  createProductController
);

// http://localhost:3000/api/v1/product/allProducts
router.get("/allProducts", allProductController);

// http://localhost:3000/api/v1/product/latestProduct
router.get("/latestProduct", latestProductController);

// http://localhost:3000/api/v1/product/deleteProduct
router.delete("/deleteProduct/:id", deleteProductController);

// For variant route

// http://localhost:3000/api/v1/product/createVariant
router.post("/createVariant", createVariantController);

module.exports = router;
