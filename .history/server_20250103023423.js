require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// connect to database
connectToDB();

app.listen(PORT, () => {
  console.log(`The server is now running on http://localhost:${PORT}`);
});
