const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    enum: ["Electronics", "Shoes", "Shoes", "Bag"],
    require: true,
  },

  images: {
    type: [String],
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
