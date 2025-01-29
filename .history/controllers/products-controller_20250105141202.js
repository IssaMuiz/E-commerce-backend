const Products = require("../models/products");

const addProduct = async (req, res) => {
  try {
    const { title, description, category, images, price } = req.body;

    const product = new Products({
      title,
      description,
      category,
      images,
      price,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const skip = (page - 1) / limit;

    const sortBy = req.query.sortBy || "bestSeller";
    const totalProducts = await Products.countDocuments();
    const totalPage = Math.ceil(totalProducts / limit);

    const sort = {};
    if (sortBy === "bestSeller") sort.bestSeller = -1;
    if (sortBy === "low-to-high") sort.price = 1;
    if (sortBy === "high-to-low") sort.price = -1;
    const allProducts = await Products.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (allProducts.length < 0) {
      return res.status({
        success: false,
        message: "Product list is empty!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      products: {
        currentPage: page,
        totalPage,
        totalProducts,
        data: allProducts,
      },
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
  const { id } = req.params;
  const { title, description, category, images, price } = req.body;

  try {
    const product = await Products.findByIdAndUpdate(
      id,
      { title, description, category, images, price },
      { new: true }
    );

    if (!product) {
      res.status(404).json({
        success: false,
        message: `product with this ID ${id} is not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: product,
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
        message: `product with this ${id} is not found`,
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Product deleted successfully!",
      product: product,
    });
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { addProduct, fetchProducts, updateProduct, deleteProduct };
