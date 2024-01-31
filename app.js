// entry point of our server

const express = require("express");
// const bodyParser = require('body-parser');
const userRoutes = require("./userRoutes");
const authenticateToken = require("./authMiddleware");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
