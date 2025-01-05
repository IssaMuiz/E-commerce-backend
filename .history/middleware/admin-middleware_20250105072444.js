const adminMiddleware = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Access denied! Admin right is required",
    });
  }

  next();
};

module.exports = adminMiddleware;
