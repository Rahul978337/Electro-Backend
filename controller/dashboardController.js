const User = require("../models/userModels");
const Product = require("../models/ProductModel");
const Order = require("../models/placeOrderModel");
const Category = require("../models/CategaryModel");

module.exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch statistics one by one
    const totalCustomers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Calculate total revenue
    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData[0]?.total || 0;

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalCustomers,
        totalProducts,
        totalOrders,
        totalRevenue,
        totalCategories,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
