const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    adress_num: {
      type: Number,
      required: true,
    },
    adress_rue: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip_code: {
      type: Number,
      required: true,
    },
    zip_code: {
      type: Number,
      required: true,
    },
    orders:[ {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order",
      }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;