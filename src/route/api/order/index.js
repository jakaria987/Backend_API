const express = require("express");
const {createOrderController, getAllOrdersController} = require("../../../controller/orderController");
const router = express.Router();

// http://localhost:3000/api/v1/order/createOrder
router.post("/createOrder", createOrderController);

// http://localhost:3000/api/v1/order/allOrders
router.get("/allOrders", getAllOrdersController);

module.exports = router;
