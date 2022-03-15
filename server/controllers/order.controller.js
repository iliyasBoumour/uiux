const orderModel=require("../models/order.model")
const asyncHandler = require("express-async-handler");
var mongoose = require('mongoose');

const getOrders=asyncHandler(async (req,res)=>{
const orders =await orderModel.find({user:req.params.id})

res.json(orders)
})
const getOneOrder=asyncHandler(async (req,res)=>{
const validParam=mongoose.Types.ObjectId.isValid(req.params.orderId);
if (!validParam) {
    res.status(400)
    throw new Error("bad param")
}
const order =await orderModel.findById(req.params?.id)
if (!order) {
    res.status(404)
    throw new Error("order not found")
}
res.json(order)
})
const addOrder=asyncHandler(async (req,res)=>{
// const order=req.body
// const newOrder =await productModel.save(order)
// res.status(201)
res.json({msg:"todo"})
})
module.exports={getOrders,addOrder,getOneOrder}