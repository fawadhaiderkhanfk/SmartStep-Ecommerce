const express = require("express");
const router = express.Router();
const { addOrderItems, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Protected routes requiring authentication
router.post("/", protect, addOrderItems);
router.get("/myorders", protect, getMyOrders);

module.exports = router;