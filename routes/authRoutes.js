import express from "express";

import { changePassword, loginUser, registerUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/password/change",authMiddleware, changePassword);

export default router;
