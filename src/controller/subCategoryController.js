const categoryModel = require("../model/category.model");
const subCategoryModel = require("../model/subCategory.model");
let slugify = require("slugify");

let addSubCategoryController = async (req, res) => {
  try {
    let { name, category } = req.body;
    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    let addSubCategory = new subCategoryModel({
      name,
      slug,
      category,
    });

    // for update category
    let updatedCategory = await categoryModel.findOneAndUpdate(
      { _id: category },
      { $push: { subCategory: addSubCategory._id } }
    );

    await updatedCategory.save();
    await addSubCategory.save();

    return res.status(201).json({
      success: true,
      message: "sub category added successfully",
      data: addSubCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

let deleteSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params;

    await subCategoryModel.findByIdAndDelete(id);

    await categoryModel.findOneAndUpdate(
      { subCategory: id },
      { $pull: { subCategory: id } }
    );

    return res.status(200).json({
      success: true,
      message: "Deleted this sub category successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

let updateSubCategoryController = async (req, res) => {
  try {
    let { id } = req.params;
    let { name } = req.body;
    let slug = slugify(name, {
      replacement: "-",
      remove: undefined,
      lower: true,
      trim: true,
    });

    await subCategoryModel.findByIdAndUpdate(id, { name, slug });

    return res.status(200).json({
      success: true,
      message: "Updated this sub category successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || error });
  }
};

module.exports = {
  addSubCategoryController,
  deleteSubCategoryController,
  updateSubCategoryController,
};
