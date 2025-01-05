const express = require("express");
const {
  fetchProducts,
  addProduct,
  updateProduct,
} = require("../controllers/products-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/addProduct", authMiddleware, adminMiddleware, addProduct);
router.post("/getProduct", authMiddleware, fetchProducts);
router.put(
  "/updateProduct/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

module.exports = router;
