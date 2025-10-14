const bannerModel = require("../model/banner.model");

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

const deleteBannerController = async (req, res) => {
  try {
    let { id } = req.params;
    await bannerModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Banner deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

module.exports = { addBannerController, deleteBannerController };
