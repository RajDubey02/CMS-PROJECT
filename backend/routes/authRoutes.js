const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:resettoken', resetPassword);

router.get("/reset-password/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }
  
      res.json({ message: "Token is valid" });
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired reset token" });
    }
  });


  router.post("/reset-password/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
  
      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  });
  
  

module.exports = router;