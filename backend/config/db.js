const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://dbTesting:root@testing-db.ilucy.mongodb.net/cms?retryWrites=true&w=majority&appName=Testing-DB");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
