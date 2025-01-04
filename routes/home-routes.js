const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the homepage",
  });
});

module.exports = router;
