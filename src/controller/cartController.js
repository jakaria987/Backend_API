const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

const addToCartController = async (req, res) => {
  try {
    let { user, product, quantity, variant } = req.body;

    let productInfo = await productModel.findById(product);
    let totalPrice = productInfo.discountPrice * quantity;

    if (productInfo.variantType == "multiVariant") {
      if (!variant) {
        res
          .status(404)
          .json({ success: false, message: "variant is required" });
      } else {
        let addToCart = new cartModel({
          user,
          product,
          variant,
          quantity,
          totalPrice,
        });

        await addToCart.save();
        res.status(201).json({
          success: true,
          message: "cart created successfully",
          data: addToCart,
        });
      }
    } else {
      let addToCart = new cartModel({
        user,
        product,
        quantity,
        totalPrice,
      });

      await addToCart.save();
      res.status(201).json({
        success: true,
        message: "cart created successfully",
        data: addToCart,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const getAllCartsController = async (req, res) => {
  try {
    let allCarts = await cartModel
      .find({})
      .populate({
        path: "user",
        select: "name email",
      })
      .populate({
        path: "product",
        select: "title image price discountPrice variant",
      })
      .populate({
        path: "variant",
        select: "size stock",
      });

    res.status(200).json({
      success: true,
      message: "All carts fetch successfully",
      data: allCarts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const singleUserCartController = async (req, res) => {
  try {
    let { id } = req.params;

    let cartList = await cartModel
      .find({ user: id })
      .select("-user")
      .populate({
        path: "product",
        select: "title image price discountPrice variant",
      })
      .populate({
        path: "variant",
        select: "size stock",
      });
    res.status(200).json({
      success: true,
      message: "Single user cart",
      data: cartList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const updateQuantityController = async (req, res) => {
  try {
    let { quantity, product } = req.body;
    let { id } = req.params;

    let productInfo = await productModel.findById(product);
    let totalPrice = productInfo.discountPrice * quantity;

    let updatedProduct = await cartModel.findOneAndUpdate(
      { product: id },
      { quantity, totalPrice },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

module.exports = {
  addToCartController,
  getAllCartsController,
  singleUserCartController,
  updateQuantityController,
};
