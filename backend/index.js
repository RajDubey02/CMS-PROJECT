// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const bodyParser = require("body-parser");

// const connectDB = require("./config/db");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");
// const tableRoutes = require("./routes/tableRoutes");
// const addOrderRoutes = require("./routes/addOrderRoutes");
// const userRoutes = require("./routes/userRoutes");
// const salesRoutes = require("./routes/salesRoutes");
// const authRoutes = require('./routes/authRoutes');

// dotenv.config();
// connectDB();

// const app = express();

// //  Ensure "uploads" folder exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// //  Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



// //  Serve uploaded files statically
// app.use("/uploads", express.static(uploadDir));

// //  Multer Storage Configuration (Restrict to Images Only)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);

//   },
// });

// //  File Filter: Allow Only Images (jpg, png, jpeg)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb(new Error("Only image files are allowed!"));
// };

// //  File Upload Middleware (10MB limit, only images)
// const upload = multer({
//   storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 10MB limit
//   fileFilter,
// });

// // File Upload Route (Single Image)
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }
//   res.json({ message: "File uploaded successfully!", filePath: `/uploads/${req.file.filename}` });
// });

// // ✅ Routes
// app.use("/api/categories", categoryRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/tables", tableRoutes);
// app.use("/api/orders", addOrderRoutes);
// app.use("/api/revenue", addOrderRoutes);
// app.use("/api/users", userRoutes);
// app.use('/api/auth', authRoutes);

// //  Root Route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// //  Error Handling Middleware (Multer & Other Errors)
// app.use((err, req, res, next) => {
//   console.error("Error:", err.message);

//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: err.message });
//   } else if (err.message === "Only image files are allowed!") {
//     return res.status(400).json({ error: err.message });
//   } else if (err) {
//     return res.status(500).json({ error: "Something went wrong." });
//   }
//   next();
// });

// //  Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const tableRoutes = require("./routes/tableRoutes");
const addOrderRoutes = require("./routes/addOrderRoutes");
const userRoutes = require("./routes/userRoutes");
const salesRoutes = require("./routes/salesRoutes");
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

//  Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//  Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//  Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

//  Multer Storage Configuration (Restrict to Images Only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  },
});

//  File Filter: Allow Only Images (jpg, png, jpeg)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only image files are allowed!"));
};

//  File Upload Middleware (10MB limit, only images)
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 10MB limit
  fileFilter,
});

// File Upload Route (Single Image)
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  res.json({ message: "File uploaded successfully!", filePath: `/uploads/${req.file.filename}` });
});

// ✅ Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", addOrderRoutes);
app.use("/api/revenue", addOrderRoutes);
app.use("/api/users", userRoutes);
app.use('/api/auth', authRoutes);

// ** Add Logout route here **
app.post("/api/auth/logout", (req, res) => {
  // If you use JWT, just remove the token from the client side (no need to do anything on the server side)
  
  // If using sessions, destroy the session here:
  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(500).json({ error: "Failed to logout" });
  //   }
  //   res.clearCookie("connect.sid");  // or any session cookie you're using
  //   res.status(200).json({ message: "Logged out successfully!" });
  // });

  // For JWT, you just need to respond with a success message since the client will handle token removal:
  res.status(200).json({ message: "Logged out successfully!" });
});

//  Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  Error Handling Middleware (Multer & Other Errors)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err.message === "Only image files are allowed!") {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: "Something went wrong." });
  }
  next();
});

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
