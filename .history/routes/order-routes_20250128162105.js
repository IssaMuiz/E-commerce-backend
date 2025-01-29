const express = require("express");

const {
  placeOrder,
  getAllUserOrders,
} = require("../controllers/order-controllers");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get(
  "/get-user-order-list",
  authMiddleware,
  adminMiddleware,
  getAllUserOrders
);

module.exports = router;
