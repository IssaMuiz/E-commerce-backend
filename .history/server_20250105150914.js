require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const productsRoutes = require("./routes/product-routes");
const orderRoutes = require("./routes/order-routes");
const connectToDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/order", orderRoutes);

// connect to database
connectToDB();

app.listen(PORT, () => {
  console.log(`The server is now running on http://localhost:${PORT}`);
});
