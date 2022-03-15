const express = require("express");
const router = express.Router();
const { addUser, login } = require("../controllers/user.controller");

// @desc    create user
// @route   GET/POST /api/auth/register
// @access  Private
router.route("/register").post(addUser);

// @desc    login
// @route   GET/POST /api/auth/login
// @access  Private
router.route("/login").post(login);

module.exports = router;
