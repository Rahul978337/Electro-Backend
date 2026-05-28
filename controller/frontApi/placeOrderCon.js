const Cart = require("../../models/addToCartModel");
const Order = require("../../models/placeOrderModel");
const { create } = require("../../models/ProductModel");



module.exports.placeOrderFromCart = async (req, res) => {
  try {
    const { userId, paymentMode } = req.body;

    // ✅ Validation
    if (!userId || !paymentMode) {
      return res.status(400).json({
        success: false,
        message: "userId and paymentMode required",
      });
    }

    // 🛒 Get cart
  
    const cart = await Cart.findOne({ userId: userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    // 💰 Total calculation
  let totalAmount = 0;
    cart.items.forEach(item => {
      const qty = Number(item.quantity || 0);
      const price = Number(item.productId.price || 0);
      totalAmount += qty * price;
    });

    // 💳 Payment logic
    let paymentStatus = paymentMode === "COD" ? "PENDING" : "SUCCESS";

    // 📦 Create order

    const formattedItems = cart.items.map(item => ({
  productId: item.productId._id,   // 👈 yaha change
  quantity: item.quantity
}));
    const order = await Order.create({
      userId,
      items: formattedItems,  // ⚠ Use cart.products instead of cart.items
      totalAmount,
      paymentMode,
      paymentStatus,
    });

    // 🧹 Clear cart
    await Cart.findOneAndDelete({ _id: cart._id });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};


// const Order = require("../../models/frontmodel/ordermodels");

module.exports.viewOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const SITEURL=`${process.env.SITEURL}/uploads/product/`

    // ✅ validation
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    // 📦 get orders
    const orders = await Order.find({ userId })
.populate("items.productId", "name image price")      .sort({ createdAt: -1 }); // latest first

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
const mapOrders = orders.map(order => ({
 _id:order._id,
 totalAmount:order.totalAmount,
 paymentStatus:order.paymentStatus,
 createdAt:order.createdAt,

  productId: order.items.map(item => ({
    name: item.productId?.name,
    price: item.productId?.price,
    quantity: item.quantity,
    image: SITEURL + item.productId?.image
  }))
}));



    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: mapOrders,
    });

  } catch (error) {
    console.log("view order error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};