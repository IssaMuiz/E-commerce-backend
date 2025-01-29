const express = require("express");
const {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/addProduct", authMiddleware, adminMiddleware, addProduct);
router.get("/products", authMiddleware, fetchProducts);
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
