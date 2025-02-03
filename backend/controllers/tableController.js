const Table = require("../models/Table");

exports.addTable = async (req, res) => {
  try {
    const { name, capacity, status } = req.body;
    const newTable = new Table({ name, capacity, status, availability: true });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    await Table.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleTableAvailability = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    table.availability = !table.availability;
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
