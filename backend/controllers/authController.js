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
    // console.log("Login Attempt:", { email, password }); // Debugging

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User Not Found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    

    if (user.password !== password) {
      console.log("Password Mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

   return res.status(200).json({ 
    success: true,
    message: "Login successful",
    user :{
      email: user.email,
      role: user.role,
    },
  });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error in login" });
  }
};



// Correctly export functions
module.exports = { register, login };
