require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const connectToDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// connect to database
connectToDB();

app.listen(PORT, () => {
  console.log(`The server is now running on http://localhost:${PORT}`);
});
