const mongoose = require("mongoose");
const connectDb = require("../models/db");
const dotenv = require("dotenv");
const products = require("./product");
const productModel = require("../models/product.model");

dotenv.config();
connectDb();

const storeData = async () => {
  try {
    await productModel.deleteMany();
    await productModel.insertMany(products);
    console.log("sucess !");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const removeData = async () => {
  try {
    await productModel.deleteMany();

    console.log("sucess !");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  removeData();
} else {
  storeData();
}