const express = require("express");
const { getSales, addSales } = require("../controllers/salesController");

const router = express.Router();

router.get("/sales", getSales);
router.post("/sales", addSales);

module.exports = router;
