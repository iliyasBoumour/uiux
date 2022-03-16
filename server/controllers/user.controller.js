const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const signJwt = require("../utils/signJwt");

const addUser = asyncHandler(async (req, res) => {
  let { fname, lname, email, password, adress } = req.body;
  if (!fname || !lname || !email || !password || !adress) {
    res.status(400);
    throw new Error("All fields are required");
  }
  let user = await userModel.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  password = bcrypt.hashSync(password, 10);
  user = await userModel.create({
    adress,
    fname,
    lname,
    email,
    password,
  });
  res.status(201).json({
    _id: user._id,
    adress: user.adress,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required");
  }
  const user = await userModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signJwt(user);
    res.header("Authorization", token).json({ token });
  } else {
    res.status(400);
    throw new Error("Bad credentials");
  }
});

const updateAdress = asyncHandler(async (req, res) => {
  const { adress } = req.body;
  if (!adress) {
    res.status(400);
    throw new Error("adress is required");
  }
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  await userModel.updateOne({ _id: user._id }, { adress });
  res.json({
    _id: user._id,
    adress,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  });
});
module.exports = { addUser, login, updateAdress };
