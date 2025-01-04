require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// middleware

app.use(express.json());

// routes

app.listen(PORT, () => {
  console.log(`The server is now running on http://localhost:${PORT}`);
});
