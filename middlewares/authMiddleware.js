import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  // Check if Authorization header exists and starts with "Bearer"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(
      `[AUTH ERROR] No token provided for ${req.method} ${req.originalUrl}`
    );
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log(`[AUTH ERROR] User not found for token: ${token}`);
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(`[AUTH ERROR] Token verification failed: ${error.message}`);
    res.status(401).json({ message: "Token invalid" });
  }
};
