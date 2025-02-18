const mongoose = require("mongoose");

const UserLogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Ensure password field exists
  role: {
    type: String,
    required: true,
    // : ['admin', 'cashier', 'user'], // Example roles
    default: 'cashier',
  },
});



module.exports = mongoose.model('UserLog', UserLogSchema);