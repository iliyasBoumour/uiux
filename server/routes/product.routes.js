const express = require("express");
const router = express.Router();
const {
  getProducts,
  getOneProduct,
} = require("../controllers/product.controller");

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route("/").get(getProducts);

// @desc    Fetch product by id
// @route   GET /api/products/:id
// @access  Public
router.route("/:id").get(getOneProduct);

module.exports = router;
