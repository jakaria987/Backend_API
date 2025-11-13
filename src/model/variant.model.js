const { default: mongoose } = require("mongoose");
const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    size: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Variant", variantSchema);
