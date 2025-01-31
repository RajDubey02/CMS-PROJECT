const Product = require("../models/Product");

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { image, name, price, description, category, active } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newProduct = new Product({ image, name, price, description, category, active });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

// Get all products with category details
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name"); // Populate category name
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};
