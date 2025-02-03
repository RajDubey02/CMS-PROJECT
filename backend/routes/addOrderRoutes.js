const express = require("express");
const router = express.Router();
const { addOrder, getOrders, deleteOrder, updateOrder } = require("../controllers/orderController");

router.post("/", addOrder);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);

module.exports = router;
