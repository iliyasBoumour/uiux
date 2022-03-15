const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const asyncHandler = require("express-async-handler");
var mongoose = require("mongoose");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.params.id });

  res.json(orders);
});
const getOneOrder = asyncHandler(async (req, res) => {
  const validParam = mongoose.Types.ObjectId.isValid(req.params.orderId);
  if (!validParam) {
    res.status(400);
    throw new Error("bad param");
  }
  const order = await orderModel.findById(req.params?.id);
  if (!order) {
    res.status(404);
    throw new Error("order not found");
  }
  res.json(order);
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
  // products.forEach((p, i) => (p.quantity = p.quantity - orders[i].qty));
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
module.exports = { getOrders, addOrder, getOneOrder };
