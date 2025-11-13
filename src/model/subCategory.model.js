const { default: mongoose } = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
