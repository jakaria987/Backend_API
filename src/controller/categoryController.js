let slugify = require("slugify");
const categoryModel = require("../model/category.model");
const fs = require("fs");
const path = require("path");

const addCategoryController = async (req, res) => {
  try {
    let { name } = req.body;
    let { filename } = req.file;

    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addCategory = new categoryModel({
      name,
      slug,
      image: `${process.env.SERVER_URL}/${filename}`,
    });

    await addCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: addCategory,
    });

    res.send({ filename, name });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    let { id } = req.params;

    let category = await categoryModel.findByIdAndDelete(id);

    if (!category) {
      res.status(400).json({ success: false, message: "Category not found" });
    } else {
      let imageUrl = category.image.split("/");
      let uploadFolder = path.join(__dirname, "../../uploads");

      fs.unlink(`${uploadFolder}/${imageUrl[imageUrl.length - 1]}`, (error) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message || error });
        }
      });

      return res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    let { filename } = req.file;
    let { name } = req.body;

    if (!filename && !name) {
      res
        .status(404)
        .json({ success: false, message: "name and image are required" });
    } else {
      let category = await categoryModel.findById(id);

      if (!category) {
        res.status(400).json({ success: false, message: "Category not found" });
      } else {
        // delete old image path
        let imageUrl = category.image.split("/");
        let filePath = path.join(__dirname, "../../uploads");

        fs.unlink(`${filePath}/${imageUrl[imageUrl.length - 1]}`, (error) => {
          if (error) {
            return res
              .status(500)
              .json({ success: false, message: error.message || error });
          }
        });
        // delete old image path

        // update image and category name
        let slug = slugify(name, {
          replacement: "-",
          remove: undefined,
          lower: true,
          trim: true,
        });

        category.image = `${process.env.SERVER_URL}/${filename}`;
        category.name = name;
        category.slug = slug;

        await category.save();

        return res
          .status(200)
          .json({ success: true, message: "Category updated successfully" });
        // update image and category name
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const allCategoryController = async (req, res) => {
  try {
    let allCategory = await categoryModel.find({}).populate({
      path: "subCategory",
      select: "name slug",
    });

    return res.status(200).json({
      success: true,
      message: "All category fetch successfully",
      data: allCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = {
  addCategoryController,
  deleteCategoryController,
  updateCategoryController,
  allCategoryController,
};
