const express = require("express");
const router = express.Router();

const  placeOrder  = require("../../controller/frontApi/placeOrderCon");

// 🛒 Add to Cart
router.post("/api/placeOrder",placeOrder.placeOrderFromCart );
router.get("/api/myOrders", placeOrder.viewOrders);

module.exports = router;