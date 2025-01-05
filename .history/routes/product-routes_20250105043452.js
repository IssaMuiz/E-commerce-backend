const express = require("express");
const {
  fetchProducts,
  addProduct,
} = require("../controllers/products-controller");
const adminMiddleware = require("../middleware/admin-middleware");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/addProduct", adminMiddleware, addProduct);
router.post("/getProduct", authMiddleware, fetchProducts);

module.exports = router;
