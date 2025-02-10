// const Order = require("../models/AddOrder");

// exports.addOrder = async (req, res) => {
//   try {
//     const { tableNumber, tableName, items, summary, status } = req.body;

//     if (!tableNumber || !tableName) {
//       return res.status(400).json({ message: "Table number and name are required." });
//     }

//     const newOrder = new Order({ tableNumber, tableName, items, summary, status });
//     await newOrder.save();

//     res.status(201).json({ message: "Order added successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding order", error: error.message });
//   }
// };

// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("items.product", "name price");
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Order deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateOrder = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const Order = require("../models/AddOrder");

exports.addOrder = async (req, res) => {
  try {
    const { tableNumber, tableName, items, summary, status } = req.body;

    if (!tableNumber || !tableName) {
      return res.status(400).json({ message: "Table number and name are required." });
    }

    // Ensure items contain productName instead of product ID
    const formattedItems = items.map((item) => ({
      productName: item.productName, // Use productName instead of ObjectId
      quantity: item.quantity,
      rate: item.rate,
      amount: item.amount,
      description: item.description,
    }));

    const newOrder = new Order({
      tableNumber,
      tableName,
      items: formattedItems,
      summary,
      status,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order added successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error adding order", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Removed populate as there's no ObjectId reference anymore
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
