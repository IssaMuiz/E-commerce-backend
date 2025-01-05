const express = require("express");
const addProduct = require("../controllers/products-controllers");

const router = express.Router();

router.post("/addProduct", addProduct);

module.exports = router;
