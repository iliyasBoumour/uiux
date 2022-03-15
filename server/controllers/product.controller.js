const res = require("express/lib/response")
const productModel=require("../models/product.model")
const asyncHandler = require("express-async-handler");

const getProducts=asyncHandler(async ()=>{
const products =await productModel.find({})
res.json(products)
})