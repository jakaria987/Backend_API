const cartModel = require("../model/cart.model");
const orderModel = require("../model/order.model");

const createOrderController = async (req, res) => {
  try {
    let { user, orderStatus, phone, address, city, paymentMethod, discount } =
      req.body;

    let cartList = await cartModel.find({ user });

    if (cartList.length == 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cart added yet" });
    } else {
      let totalPrice = cartList.reduce((prev, current) => {
        return prev + current.totalPrice;
      }, 0);

      let order = new orderModel({
        user,
        phone,
        address,
        city,
        paymentMethod,
        discount,
        orderStatus,
        item: cartList,
        totalPrice,
      });

      await order.save();

      let deleteCart = await cartModel.deleteMany({ user });

      return res.status(201).json({
        success: true,
        message: "Order completed successfully",
        data: order,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getAllOrdersController = async (req, res) => {
  try {
    let allOrders = await orderModel
      .find({})
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "item.product",
        select: "title price discountPrice image quantity",
      })
      .populate({
        path: "item.variant",
        select: "size stock",
      });

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: allOrders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = { createOrderController, getAllOrdersController };
