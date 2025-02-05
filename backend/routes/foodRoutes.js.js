const express = require('express');
const { getPopularFood, addFoodItem } = require('../controllers/foodController');

const router = express.Router();

router.get('/popular-food', getPopularFood);
router.post('/popular-food', addFoodItem);

module.exports = router;
