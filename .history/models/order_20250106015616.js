const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  products: [
    {
      productId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
      ],
      quantity: [
        {
          type: Number,
          required: true,
        },
      ],
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
