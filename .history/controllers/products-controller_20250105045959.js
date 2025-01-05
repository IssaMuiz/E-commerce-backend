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

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, description, category, images, price } = req.body;

  try {
    const product = await Products.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: `product with this ${product} is not found`,
      });
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.images = images || product.images;
    product.price = price || product.price;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: `product with this ${product} is not found`,
      });
    }

    const deletedProduct = await product.save();

    res.status(200).json({
      sucess: true,
      message: "Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { addProduct, fetchProducts, updateProduct };
