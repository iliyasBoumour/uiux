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
  password = bcrypt.hashSync(password, 10); // reassigner des valeurs comme ça peut être problématique, n'hésitez pas à faire une valeur "hash" intermédiaire
  user = await userModel.create({ // même commentaire ici, évitez de réassigner des objects d'entrée 
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
  const { adress } = req.body; // 2 d à address ;)
  if (!adress) {
    res.status(400);
    throw new Error("address is required");
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
const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  res.json({
    _id: user._id,
    adress: user.adress,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  });
});

module.exports = { addUser, login, updateAdress, getUser };
