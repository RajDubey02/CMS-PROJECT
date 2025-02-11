// const crypto = require('crypto');
// const User = require('../models/UserLog');
// const jwt = require('jsonwebtoken');
// const sendEmail = require('../utils/sendEmail');

// // Register user
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create user
//     user = await User.create({
//       name,
//       email,
//       password
//     });

//     // sendTokenResponse(user, 201, res);
//   } catch (error) {
//     res.status(500).json({ message: 'Error in registration' });
//   }
// };

// // Login user
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate email & password
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please provide email and password' });
//     }

//     // Check for user
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // sendTokenResponse(user, 200, res);
//   } catch (error) {
//     res.status(500).json({ message: 'Error in login' });
//   }
// };

// // Forgot password
// exports.forgotPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Get reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     // Hash token and set to resetPasswordToken field
//     user.resetPasswordToken = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');

//     // Set expire
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

//     await user.save();

//     // Create reset url
//     const resetUrl = `${req.protocol}://${req.get(
//       'host'
//     )}/api/auth/reset-password/${resetToken}`;

//     const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

//     try {
//       await sendEmail({
//         email: user.email,
//         subject: 'Password reset token',
//         message
//       });

//       res.status(200).json({ message: 'Email sent' });
//     } catch (err) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;

//       await user.save();

//       return res.status(500).json({ message: 'Email could not be sent' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error in forgot password' });
//   }
// };

// // Reset password
// exports.resetPassword = async (req, res) => {
//   try {
//     // Get hashed token
//     const resetPasswordToken = crypto
//       .createHash('sha256')
//       .update(req.params.resettoken)
//       .digest('hex');

//     const user = await User.findOne({
//       resetPasswordToken,
//       resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid token' });
//     }

//     // Set new password
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     res.status(500).json({ message: 'Error in reset password' });
//   }
// };

// // Get token from model, create cookie and send response
// // const sendTokenResponse = (user, statusCode, res) => {
// //   // Create token
// //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //     expiresIn: process.env.JWT_EXPIRE
// //   });

// //   res.status(statusCode).json({
// //     success: true,
// //     token
// //   });
// // };

const User = require("../models/UserLog");

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in registration" });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt:", { email, password }); // Debugging

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User Not Found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Stored Password:", user.password);
    console.log("Entered Password:", password);

    if (user.password !== password) {
      console.log("Password Mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error in login" });
  }
};



// Correctly export functions
module.exports = { register, login };
