const express = require("express");

const placeOrder = require("../controllers/order-controllers");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/order", authMiddleware, placeOrder);

module.exports = router;
