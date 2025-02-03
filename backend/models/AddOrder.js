const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  table: { type: String, required: true },
  items: [
    {
      product: String,
      quantity: Number,
      rate: Number,
      amount: Number,
      description: String,
    },
  ],
  summary: {
    grossAmount: Number,
    serviceChargeRate: Number,
    vatRate: Number,
    discountPercentage: Number,
    serviceCharge: Number,
    vat: Number,
    discountAmount: Number,
    netAmount: Number,
  },
  status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
