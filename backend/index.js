const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const tableRoutes = require("./routes/tableRoutes");
const addOrderRoutes = require("./routes/addOrderRoutes");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");const salesRoutes = require("./routes/salesRoutes");
const foodRoutes = require('./routes/foodRoutes');


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);


app.use("/api/tables", tableRoutes);

app.use("/api/orders", addOrderRoutes);

app.use("/api/users", userRoutes);

app.use(bodyParser.json({ limit: '50mb' }));  // Increase JSON payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/report", salesRoutes);
app.use('/api/food', foodRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
