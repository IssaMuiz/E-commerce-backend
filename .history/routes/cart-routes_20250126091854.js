const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cart-controller");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/add-to-cart", authMiddleware, addToCart);
router.get("/get-cart", authMiddleware, getCart);
router.delete("/remove-from-cart", authMiddleware, removeFromCart);

module.exports = router;
