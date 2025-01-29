const Order = require("../models/order");
const Cart = require("../models/order");

const placeOrder = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    const userCart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "title name",
    });

    if (!userCart || userCart.items.length === 0) {
      res.status(404).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const order = new Order({
      userId,
      items: userCart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalPrice: userCart.totalPrice,
    });

    await order.save();

    userCart.items = [];
    userCart.totalPrice = 0;

    await userCart.save();

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

module.exports = placeOrder;
