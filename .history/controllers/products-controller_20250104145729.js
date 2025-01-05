const Products = require("../models/products");

const addProduct = async (req, res) => {
  const { id, title, description, category, images, price } = req.body;

  const product = await new Products({
    data: {
      title,
      description,
      category,
      images,
      price,
    },
  });
};
