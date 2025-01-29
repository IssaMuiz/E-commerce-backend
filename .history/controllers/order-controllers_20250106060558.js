const Products = require("../models/products");
const Order = require("../models/order");

const placeOrder = async (req, res) => {
  const { userId, products } = req.body;

  let totalAmount = 0;
  try {
    for (const item of products) {
      const product = await Products.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The product with the ID : ${item.productId} cannot be found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}. There is ${product.stock} left`,
        });
      }

      totalAmount += product.price * item.quantity;

      product.stock -= item.quantity;

      product.salesCount += item.quantity;

      await product.save();
    }

    const order = new Order({
      user: userId,
      products,
      totalAmount,
    });

    await order.save();

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
