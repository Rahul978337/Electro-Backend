const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,

  paymentMode: {
    type: String,
    enum: ["COD", "ONLINE", "UPI"],
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS"],
    default: "PENDING",
  },

}, { timestamps: true });

module.exports = mongoose.model("orders", orderSchema);