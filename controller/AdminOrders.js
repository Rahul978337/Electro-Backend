const Cart = require("../models/addToCartModel");
const Order = require("../models/placeOrderModel");

module.exports.viewOrders = async (req, res) => {
  try {
    const SITEURL=`${process.env.SITEURL}/uploads/product/`

    // 📦 get orders
    const orders = await Order.find()
      .populate("items.productId", "name image price")
      .populate("userId", "first_name last_name image email mobile")
      .sort({ createdAt: -1 }); // latest first

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
 user: {
   name: ((order.userId?.first_name || "") + " " + (order.userId?.last_name || "")).trim() || "Unknown",
   image: order.userId?.image ? `${process.env.SITEURL}/uploads/users/${order.userId.image}` : null,
   email: order.userId?.email,
   mobile: order.userId?.mobile
 },

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