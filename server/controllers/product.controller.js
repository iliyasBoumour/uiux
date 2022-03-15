const productModel=require("../models/product.model")
const asyncHandler = require("express-async-handler");
var mongoose = require('mongoose');

const getProducts=asyncHandler(async (req,res)=>{
const products =await productModel.find({})

res.json(products)
})
const getOneProduct=asyncHandler(async (req,res)=>{
const validParam=mongoose.Types.ObjectId.isValid(req.params.id);
if (!validParam) {
    res.status(400)
    throw new Error("bad param")
}
const product =await productModel.findById(req.params?.id)
if (!product) {
    res.status(404)
    throw new Error("product not found")
}
res.json(product)
})
module.exports={getProducts,getOneProduct}