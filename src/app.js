const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/routes/auth.routes")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Truck Booking Backend API is running successfully!"
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

module.exports = app;