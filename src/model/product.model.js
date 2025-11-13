const { default: mongoose } = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: true,
    },
    image: {
      type: Array,
      required: [true, "image is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    slug: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    reviews: [
      {
        type: String,
      },
    ],
    variantType: {
      type: String,
      enum: ["singleVariant", "multiVariant"],
    },
    variants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Variant",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
