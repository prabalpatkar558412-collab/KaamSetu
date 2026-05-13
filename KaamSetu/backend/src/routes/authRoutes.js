import express from "express";

import {
  registerUser,
  loginUser,
  getOnlineWorkers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

// 🔥 Online Workers
router.get(
  "/online-workers",
  getOnlineWorkers
);

export default router;