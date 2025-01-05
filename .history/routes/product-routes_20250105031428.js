const express = require("express");
const addProduct = require("../controllers/products-controller");

const router = express.Router();

router.post("/addProduct", addProduct);

module.exports = router;
