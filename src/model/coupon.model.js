const { default: mongoose } = require("mongoose");
const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      required: [true, "coupon code is required"],
    },
    minPrice: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
