const express = require("express");
const router = express.Router();
const {
  getOrders,
  addOrder,getOneOrder
} = require("../controllers/order.controller");

// @desc    Fetch all orders
// @route   GET/POST /api/:id/orders
// @access  Private
router.route("/").get(getOrders).post(addOrder);

// @desc    Fetch all orders
// @route   GET/POST /api/:id/orders
// @access  Private
router.route("/:orderId").get(getOneOrder);


module.exports = router;