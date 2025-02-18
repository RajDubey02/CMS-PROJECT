// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // Register User
// exports.registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, phone, password, gender } = req.body;

//     if (!firstName || !lastName || !email || !phone || !password || !gender) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const newUser = await User.create({ firstName, lastName, email, phone, password, gender });

//     res.status(201).json({
//       _id: newUser._id,
//       firstName: newUser.firstName,
//       email: newUser.email,
//       token: generateToken(newUser._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error: error.message });
//   }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.status(200).json({
//         _id: user._id,
//         firstName: user.firstName,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error: error.message });
//   }
// };

// // Get all users
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // Exclude passwords
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error: error.message });
//   }
// };

// // Delete User
// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     await user.deleteOne();
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting user", error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) return res.status(404).json({ message: "User not found" });
  
//       user.firstName = req.body.firstName || user.firstName;
//       user.lastName = req.body.lastName || user.lastName;
//       user.email = req.body.email || user.email;
//       user.phone = req.body.phone || user.phone;
//       user.gender = req.body.gender || user.gender;
  
//       const updatedUser = await user.save();
//       res.status(200).json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ message: "Error updating user", error: error.message });
//     }
//   };
  


const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, gender, designation } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !phone || !password || !gender || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      designation,  // Save the designation field
    });

    // Respond with the newly created user and JWT token
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists and if passwords match
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update user details, including designation
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.gender = req.body.gender || user.gender;
    user.designation = req.body.designation || user.designation;  // Handle designation field

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
