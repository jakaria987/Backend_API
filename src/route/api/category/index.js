const express = require("express");
const {
  addCategoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController,
} = require("../../../controller/categoryController");
const createUploader = require("../../../utils/upload");
const router = express.Router();
const upload = createUploader("./uploads");

//http://localhost:3000/api/v1/category/addCategory
http: router.post(
  "/addCategory",
  upload.single("category"),
  addCategoryController
);
// to active jwt uncomment this line
// router.post("/addCategory", tokenCheckMiddleware, adminCheck, upload.single("category"), addCategoryController);

//http://localhost:3000/api/v1/category/deleteCategory
router.delete("/deleteCategory/:id", deleteCategoryController);
// to active jwt uncomment this line
// router.post("/deleteCategory/:id", tokenCheckMiddleware, adminCheck, upload.single("category"), deleteCategoryController);

//http://localhost:3000/api/v1/category/updateCategory
router.put(
  "/updateCategory/:id",
  upload.single("category"),
  updateCategoryController
);
// to active jwt uncomment this line
// router.post("/updateCategory/:id", tokenCheckMiddleware, adminCheck, upload.single("category"), updateCategoryController);

//http://localhost:3000/api/v1/category/allCategory
router.get("/allCategory", allCategoryController);

module.exports = router;
