const Products = require("../models/products");

const addProduct = async (req, res) => {
  const { title, description, category, images, price } = req.body;

  const product = new Products({
    products: {
      title,
      description,
      category,
      images,
      price,
    },
  });

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product added successfully",
    products: product,
  });
};

module.exports = addProduct;
