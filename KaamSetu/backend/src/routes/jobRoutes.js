import express from "express";

import {
  createJob,
  getJobs,
  getRecommendedJobs,
  getAvailableJobs,
  bookJob,
  updateJobStatus,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);

router.get("/", getJobs);

// 🔥 Available nearby jobs
router.get("/available", getAvailableJobs);

// 🔥 One-click booking
router.put("/book/:jobId", bookJob);

// 🔥 Live status updates
router.put("/status/:jobId", updateJobStatus);

router.post("/recommended", getRecommendedJobs);

export default router;