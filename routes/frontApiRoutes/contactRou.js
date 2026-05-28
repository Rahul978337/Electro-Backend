// routes/cart.js
const express = require("express");
const router = express.Router();

const  contact  = require("../../controller/frontApi/contactCon");

// 🛒 Add to Cart
router.post("/api/contact",contact.submitContact );
router.get("/api/allContact", contact.getAllContacts);

module.exports = router;