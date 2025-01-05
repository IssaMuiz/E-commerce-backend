const Products = require("../models/products");

const addProduct = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    if (!allProducts) {
      return res.status({
        success: false,
        message: "Product list is empty!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products: allProducts,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { addProduct, fetchProducts };
