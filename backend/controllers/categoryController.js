const Category = require("../models/Category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required." });

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error: error.message });
  }
};
