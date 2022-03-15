const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    products:[ {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      }],
    valid: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);
const User = mongoose.model("Order", orderSchema);
module.exports = User;