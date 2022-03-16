const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const asyncHandler = require("express-async-handler");

const validateAdmin = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user.isAdmin) {
    res.status(403);
    throw new Error("Only admins has access");
  }
  next();
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ valid: false });
  res.json(orders);
});
const validateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    res.status(400);
    throw new Error("Bad params");
  }
  const order = await orderModel.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  const newOrd = await orderModel.updateOne({ _id: orderId }, { valid: true });

  res.json(newOrd);
});
const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.user._id });

  res.json(orders);
});
const addOrder = asyncHandler(async (req, res) => {
  const uid = req.user._id;
  const orders = req.body;
  const user = await userModel.findById(uid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const prodIds = orders.map((o) => o._id);
  const products = await productModel.find({
    _id: { $in: prodIds },
  });
  const isAvailable = products.filter((p, i) => p.quantity >= orders[i].qty);
  if (isAvailable.length !== orders.length) {
    res.status(400);
    throw new Error("not available");
  }
  const order = await orderModel.create({
    user: uid,
    products: prodIds,
  });
  await Promise.all(
    products.map(async (p, i) => {
      await productModel.updateOne(
        { _id: orders[i]._id },
        { quantity: p.quantity - orders[i].qty }
      );
    })
  );
  res.status(201);
  res.json(order);
});
module.exports = {
  getOrders,
  addOrder,
  getOrdersByUser,
  validateOrder,
  validateAdmin,
};
