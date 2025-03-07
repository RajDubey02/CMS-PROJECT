const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completionRate: { type: Number, required: true }
});

module.exports = mongoose.model('Food', FoodSchema);
