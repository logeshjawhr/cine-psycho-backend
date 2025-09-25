import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import logger from "./utils/logger.js";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || PORT;

// Connect to DB
connectDb();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Custom logging middleware
app.use(logger);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.send("hello from server");
});

// Routes 
app.use("/api/auth", authRoutes);
app.use("/", movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
