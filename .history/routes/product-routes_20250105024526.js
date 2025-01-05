const express = require("express");
const addProduct = require("../controllers/auth-controllers");

const router = express.Router();

router.post("/addProduct", addProduct);

module.exports = router;
