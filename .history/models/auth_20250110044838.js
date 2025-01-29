const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    min: [5, "password should not be less than 5 characters"],
    max: [12, "password should not be more than 15 characters"],
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
    required: true,
  },

  cart: {
    type: Array,
    default: [],
  },
  Address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
