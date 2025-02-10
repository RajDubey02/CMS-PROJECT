const express = require("express");
const router = express.Router();
const { addOrder, getOrders, deleteOrder, updateOrder,period,startDate,revenueData } = require("../controllers/orderController");

router.post("/", addOrder);
router.get("/", getOrders);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);

router.get("/revenue/:period", async (req, res) => {

    const { period } = req.params;

    console.log("Fetching data for period:", period);

    try {
    //   const { period } = req.params;
      const now = new Date();
      let startDate, groupByFormat;
  
      if (period === "daily") {
        startDate = new Date(now.setDate(now.getDate() - 7));
        groupByFormat = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
      } else if (period === "weekly") {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        groupByFormat = { $dateToString: { format: "%Y-%U", date: "$createdAt" } };
      } else if (period === "monthly") {
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        groupByFormat = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
      } else {
        return res.status(400).json({ error: "Invalid period" });
      }
  
      const revenueData = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: groupByFormat,
            totalRevenue: { $sum: "$summary.netAmount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      const labels = revenueData.map((data) => data._id);
      const revenue = revenueData.map((data) => data.totalRevenue);
  
      res.json({ labels, revenue });
    } catch (error) {
        console.error("Error fetching revenue:", error);
      res.status(500).json({ error: "Server error" });
    }
  });



//   console.log("Fetching data for period:", period);
// console.log("Start Date:", startDate);
// console.log("Revenue Data:", revenueData);

  
module.exports = router;
