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

// const User = mongoose.model("UserLog", UserLogSchema);
// module.exports = User;


// Encrypt password before saving
// userLogSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// // Match password
// userLogSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('UserLog', UserLogSchema);