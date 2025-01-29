const Cart = require("../models/cart");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    const userId = req.userInfo.id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItems = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItems) {
      existingItems.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.userInfo.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = addToCart;
