const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/products");
const placeOrder = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const userCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title price",
    });

    if (!userCart || userCart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const product = await Product.findOne({ userId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const order = new Order({
      userId,
      items: userCart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalPrice: userCart.totalPrice,
    });

    await order.save();

    userCart.items = [];
    userCart.totalPrice = 0;

    await userCart.save();

    product.stock -= order.items.quantity;
    product.salesCount += order.items.quantity;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Something went wrong!", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const getAllUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const order = await Order.find({ userId }).populate({
      path: "items.productId",
      select: "title description price",
    });

    if (!order) {
      res.status(404).json({
        success: false,
        message: "User Order list is empty",
      });
    }

    res.status(200).json({
      success: true,
      message: "User order list fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Something went wrong!", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { placeOrder, getAllUserOrders };
