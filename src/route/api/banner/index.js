const express = require("express");
const {
  addBannerController,
  deleteBannerController,
  updatedBannerController,
  getAllBannerController,
} = require("../../../controller/bannerController");
const createUploader = require("../../../utils/upload");
const {
  tokenCheckMiddleware,
  adminCheck,
} = require("../../../utils/authMiddleware");

const router = express.Router();

const upload = createUploader("./uploads");

// http://localhost:3000/api/v1/banner/addBanner
router.post("/addBanner", upload.single("banner"), addBannerController);
// to active jwt uncomment this line
// router.post("/addBanner", tokenCheckMiddleware, adminCheck, upload.single("banner"), addBannerController);

// http://localhost:3000/api/v1/banner/deleteBanner
router.delete("/deleteBanner/:id", deleteBannerController);
// to active jwt uncomment this line
// router.delete("/deleteBanner/:id",tokenCheckMiddleware, adminCheck, deleteBannerController);

// http://localhost:3000/api/v1/banner/updatedBanner
router.patch(
  "/updatedBanner/:id", upload.single("banner"), updatedBannerController
);

// http://localhost:3000/api/v1/banner/getAllBanner
router.get("/allBanners", getAllBannerController);

module.exports = router;
