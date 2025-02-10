const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },  // Changed from 'table' to 'tableNumber'
  tableName: { type: String, required: true },    // Added tableName
  items: [
    {
      // product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productName: { type: String, required: true },
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
  status: { type: String, default: "Unpaid" },
},

{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
