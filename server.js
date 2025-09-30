import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import logger from "./utils/logger.js";

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Apply rate limiting to all requests
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

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

// Auth Routes
app.use("/api/auth", authRoutes);

// Movie Routes
app.use("/api", movieRoutes);

// Progress Routes
app.use("/api/progress", progressRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
