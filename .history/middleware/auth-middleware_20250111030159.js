const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied! No token provided, Please login",
    });
  }

  // decode token

  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decodeTokenInfo);

    req.userInfo = decodeTokenInfo;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied! No token provided, Please login",
    });
  }
};

module.exports = authMiddleware;
