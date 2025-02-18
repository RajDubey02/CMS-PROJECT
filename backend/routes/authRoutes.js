const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUserProfile,
  updateUserProfile
 } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get("/user/profile/:email", getUserProfile);
router.put("/user/profile/:email", updateUserProfile);
  
  

module.exports = router;