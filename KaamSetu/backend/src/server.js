import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import aiRoutes from "./routes/aiRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("worker_online", async (userId) => {
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });
  });

  socket.on("join_job", (jobId) => {
    socket.join(jobId);
  });

  socket.on("worker_location", ({ jobId, lat, lng }) => {
    io.to(jobId).emit("location_update", {
      lat,
      lng,
    });
  });

  socket.on("worker_offline", async (userId) => {
    await User.findByIdAndUpdate(userId, {
      isOnline: false,
    });
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("KaamCall AI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});