const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, // Store category ID
      ref: "Category", // Reference the Category model
      required: true,
    },
    active: {
      type: String,
      default: "Yes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
