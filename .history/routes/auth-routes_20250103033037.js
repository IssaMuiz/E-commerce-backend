const express = require("express");
const register = require("../controllers/auth-controllers");

const router = express.Router;

router.post("/register", register);

module.exports = { register };
