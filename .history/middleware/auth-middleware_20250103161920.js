const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Access denied! Token is not provided, please login",
    });
  }

  /* const accessToken = jwt.sign(token, process.env.JWT_SECRET_KEY)

  if (accessToken) {
    userId : user._id,

  } */

  next();
};

module.exports = authMiddleware;
