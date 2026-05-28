const express = require("express");
const router = express.Router();

const AdminOrders = require("../controller/AdminOrders");

// 🛒 Admin view all Orders
router.get("/api/Orders-details", AdminOrders.viewOrders);

module.exports = router;