const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  revenues: { type: Number, required: true },
  customers: { type: Number, required: true },
  sales: { type: Number, required: true },
});

module.exports = mongoose.model("Sales", salesSchema);
