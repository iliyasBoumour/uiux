const express = require("express");
const router = express.Router();
const validateJwt = require("../utils/parseJwt");
const {
  addUser,
  login,
  updateAdress,
} = require("../controllers/user.controller");

// @desc    create user
// @route   GET/POST /api/auth/register
// @access  Private
router.route("/register").post(addUser);

// @desc    login
// @route   GET/POST /api/auth/login
// @access  Private
router.route("/login").post(login);

// @desc    update adress
// @route   PUT /api/auth/updateUser
// @access  Private
router.route("/updateUser").put(validateJwt, updateAdress);

module.exports = router;
