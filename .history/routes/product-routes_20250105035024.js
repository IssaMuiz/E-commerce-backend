const express = require("express");
const {
  fetchProducts,
  addProduct,
} = require("../controllers/products-controller");

const router = express.Router();

router.post("/addProduct", addProduct);
router.post("/getProduct", fetchProducts);

module.exports = router;
