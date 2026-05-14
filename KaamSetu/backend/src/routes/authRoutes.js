import express from "express";

import {
  registerUser,
  loginUser,
  getOnlineWorkers,
  updateUserProfile,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 UPDATE PROFILE
router.put(
  "/update-profile",
  protect,
  updateUserProfile
);

// 🔥 ONLINE WORKERS
router.get(
  "/online-workers",
  getOnlineWorkers
);

export default router;