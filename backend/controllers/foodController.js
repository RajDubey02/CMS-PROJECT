const Food = require('../models/Food');

// Get all food items
exports.getPopularFood = async (req, res) => {
  try {
    const foods = await Food.find();
    const labels = foods.map(food => food.name);
    const data = foods.map(food => food.completionRate);

    res.json({ labels, data });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new food item
exports.addFoodItem = async (req, res) => {
  try {
    const { name, completionRate } = req.body;
    const newFood = new Food({ name, completionRate });
    await newFood.save();
    res.status(201).json({ message: 'Food item added', food: newFood });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
