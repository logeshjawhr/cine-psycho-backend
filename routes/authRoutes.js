import express from "express";

import { changePassword, getAllUsers, getProfile, loginUser, registerUser, updateProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/password/change", authMiddleware, changePassword);

router.get("/current/profile", authMiddleware, getProfile);
router.post("/update/current/profile", authMiddleware, updateProfile);

router.get("/admin/all/users", authMiddleware, getAllUsers);

export default router;
