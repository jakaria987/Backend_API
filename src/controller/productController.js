const { default: slugify } = require("slugify");
const productModel = require("../model/product.model");
const variantModel = require("../model/variant.model");
const fs = require("fs");
const path = require("path");

const createProductController = async (req, res) => {
  try {
    let {
      title,
      description,
      category,
      stock,
      price,
      discountPrice,
      reviews,
      variantType,
    } = req.body;

    let slug = slugify(title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let productImageFile = req.files.map((item) => {
      return `${process.env.SERVER_URL}/${item.filename}`;
    });

    let product = new productModel({
      title,
      description,
      slug,
      category,
      stock,
      price,
      discountPrice,
      reviews,
      variantType,
      image: productImageFile,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params;

    let findProduct = await productModel.findById(id);

    // For delete stored image after deleted the product
    findProduct.image.forEach((url) => {
      let imageUrl = url.split("/");
      let uploadFolder = path.join(__dirname, "../../uploads");
      fs.unlink(`${uploadFolder}/${imageUrl[imageUrl.length - 1]}`, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message || error });
        }
      });
    });
    // For delete stored image after deleted the product
    
    await productModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const allProductController = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .populate({ path: "variants", select: "size stock -_id" })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All Product Fetch successfully",
      data: allProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const latestProductController = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .populate({ path: "variants", select: "size stock -_id" })
      .sort({ createdAt: -1 })
      .limit(5);
    return res.status(200).json({
      success: true,
      message: "All Product Fetch successfully",
      data: allProducts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

// variant controller
const createVariantController = async (req, res) => {
  try {
    let { size, stock, product } = req.body;

    let variant = new variantModel({ size, stock, product });
    await variant.save();

    await productModel.findOneAndUpdate(
      { _id: product },
      { $push: { variants: variant._id } }
    );

    return res.status(201).json({
      success: true,
      message: "variant created successfully",
      data: variant,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = {
  createProductController,
  createVariantController,
  allProductController,
  deleteProductController,
  latestProductController,
};
