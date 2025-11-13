const express = require("express");
const {
  addSubCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
} = require("../../../controller/subCategoryController");

const router = express.Router();

// http://localhost:3000/api/v1/subCategory/addSubCategory
router.post("/addSubCategory", addSubCategoryController);
// to active jwt uncomment this line
// router.post("/addSubCategory", tokenCheckMiddleware, adminCheck, addSubCategoryController);

// http://localhost:3000/api/v1/subCategory/deleteSubCategory
router.delete("/deleteSubCategory/:id", deleteSubCategoryController);
// to active jwt uncomment this line
// router.delete("/deleteSubCategory/:id", tokenCheckMiddleware, adminCheck, deleteSubCategoryController);

// http://localhost:3000/api/v1/subCategory/updateSubCategory
router.patch("/updateSubCategory/:id", updateSubCategoryController);
// to active jwt uncomment this line
// router.patch("/updateSubCategory/:id", tokenCheckMiddleware, adminCheck, updateSubCategoryController);

module.exports = router;
