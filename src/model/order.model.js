const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: String,
      enum: ["insideDhaka", "outsideDhaka"],
      default: "outsideDhaka",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
    },
    item: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        variant: {
          type: mongoose.Types.ObjectId,
          ref: "Variant",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "canceled", "delivered"],
      default: "pending",
    },
    trans_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
