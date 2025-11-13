const { error } = require("console");
const bannerModel = require("../model/banner.model");
const fs = require("fs");
const path = require("path");

// create banner
const addBannerController = async (req, res) => {
  let { link } = req.body;
  let { filename } = req.file;

  try {
    let banner = await new bannerModel({
      image: `${process.env.SERVER_URL}/${filename}`,
      link,
    });
    await banner.save();
    return res.status(200).json({
      success: true,
      message: "Banner created Successfully",
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

// delete banner
const deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params;

    const deletedBanner = await bannerModel.findOneAndDelete({ _id: id });

    // if you already deleted this data and press to delete
    if (!deletedBanner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }
    // if you already deleted this data and press to delete

    let imageUrl = deletedBanner.image.split("/");
    let filePath = path.join(__dirname, "../../uploads");

    fs.unlink(`${filePath}/${imageUrl[imageUrl.length - 1]}`, (error) => {
      if (error) {
        console.log(error);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Banner deleted Successfully",
      data: deletedBanner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

// update banner
const updatedBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;
    let findBanner = await bannerModel.findOne({ _id: id });

    if (findBanner) {
      // pervious image path delete
      let imageUrl = findBanner.image.split("/");
      let filePath = path.join(__dirname, "../../uploads");

      fs.unlink(`${filePath}/${imageUrl[imageUrl.length - 1]}`, (error) => {
        if (error) {
          console.log(error);
        }
      });
      // pervious image path delete

      // for update the banner to database
      let updatedBanner = await bannerModel.findOneAndUpdate(
        { _id: id },
        { image: `${process.env.SERVER_URL}/${filename}` },
        { new: true }
      );
      await updatedBanner.save();
      // for update the banner to database

      res.status(200).json({
        success: true,
        message: "Banner Updated Successfully",
        data: updatedBanner,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

// Get all banner
const getAllBannerController = async (req, res) => {
  try {
    let allBanners = await bannerModel.find({});
    if (allBanners.length == 0) {
      res.status(404).json({ success: false, message: "No Banner fetched" });
    } else {
      res.status(200).json({
        success: true,
        message: "All Banners fetched Successfully",
        data: allBanners,
      });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Banner not found" });
  }
};

module.exports = {
  addBannerController,
  deleteBannerController,
  updatedBannerController,
  getAllBannerController,
};
