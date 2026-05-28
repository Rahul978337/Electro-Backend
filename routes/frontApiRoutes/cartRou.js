// routes/cart.js
const express = require("express");
const router = express.Router();

const  addToCart  = require("../../controller/frontApi/cartCon");

// 🛒 Add to Cart
router.post("/add-to-cart",addToCart.addToCart );
router.get("/cart/:userId", addToCart.getCart);
router.post("/remove-from-cart", addToCart.removeFromCart);
// router.post("/update-quantity", addToCart.updateQuantity);

module.exports = router;