// controllers/cartController.js
const statuscode = require("http-status-codes");

const Cart = require("../../models/addToCartModel");

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Please login first to add products to cart" });
    }

    let cart = await Cart.findOne({ userId });

    
    if (!cart) {
      if (action === "decrease") {
        return res.status(404).json({ success: false, message: "Cart nahi mila" });
      }
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      
      const index = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (action === "decrease") {
       
        if (index > -1) {
          cart.items[index].quantity -= 1;
          if (cart.items[index].quantity <= 0) {
            cart.items.splice(index, 1); 
          }
        } else {
          return res.status(404).json({ success: false, message: "Product cart mein nahi hai" });
        }
      } else {
        
        if (index > -1) {
          cart.items[index].quantity += 1;
        } else {
          cart.items.push({ productId, quantity: 1 });
        }
      }
    }

    await cart.save();

    res.json({
      success: true,
      message: action === "decrease" ? "Quantity kam ho gayi" : "Added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: "User ID and Product ID are required." });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found." });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ success: false, message: "Product not found in cart." });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Product removed from cart successfully",
      cart
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/cartController.js



exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

   
    const SITEURL = `${process.env.SITEURL}/uploads/product/`;

    const updatedItems = cart.items.map(item => {
      const product = item.productId;

      return {
        ...item._doc,
        productId: {
          ...product._doc,
          image: product?.image
            ? SITEURL + product.image
            : null
        }
      };
    });

    res.json({
      success: true,
      cart: {
        ...cart._doc,
        items: updatedItems
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};