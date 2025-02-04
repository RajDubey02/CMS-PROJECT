const Sales = require("../models/Sales");

// Get all sales records
exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data", error });
  }
};

// Add new sales record
exports.addSales = async (req, res) => {
  try {
    const { revenues, customers, sales } = req.body;

    if (!revenues || !customers || !sales) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSale = new Sales({ revenues, customers, sales });
    await newSale.save();
    res.status(201).json({ message: "Sales record added successfully", newSale });
  } catch (error) {
    res.status(500).json({ message: "Error saving sales data", error });
  }
};
