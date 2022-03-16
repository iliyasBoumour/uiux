const express = require("express");
const router = express.Router();
const {
  getOrders,
  addOrder,
  getOrdersByUser,
  validateOrder,
  validateAdmin,
} = require("../controllers/order.controller");

// @desc    Fetch all user's orders / add order
// @route   GET/POST /api/orders
// @access  Private
router.route("/").get(getOrdersByUser).post(addOrder);

// @desc    Fetch all orders
// @route   GET/POST /api/orders/valid
// @access  Admin access
router
  .route("/valid")
  .get(validateAdmin, getOrders)
  .put(validateAdmin, validateOrder);

module.exports = router;
