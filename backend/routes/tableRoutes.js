const express = require("express");
const router = express.Router();
const {
  addTable,
  getTables,
  deleteTable,
  updateTable,
  toggleTableAvailability,
} = require("../controllers/tableController");

router.post("/", addTable);
router.get("/", getTables);
router.delete("/:id", deleteTable);
router.put("/:id", updateTable);
router.patch("/:id/toggle-availability", toggleTableAvailability);

module.exports = router;
