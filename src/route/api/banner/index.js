const express = require("express");
const {addBannerController, deleteBannerController} = require("../../../controller/bannerController");
const createUploader = require("../../../utils/upload");

const router = express.Router();

const upload = createUploader("./uploads")


// http://localhost:3000/api/v1/banner/addBanner
router.post("/addBanner", upload.single("banner"), addBannerController);

// http://localhost:3000/api/v1/banner/deleteBanner
router.delete("/deleteBanner/:id", deleteBannerController);

module.exports = router;
