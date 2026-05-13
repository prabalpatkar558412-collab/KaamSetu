import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // 🔥 IMPORTANT UPGRADE: GPS SUPPORT
    location: {
      address: {
        type: String,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    salary: {
      type: Number,
      required: true,
    },

    skillsRequired: {
      type: [String],
      default: [],
    },

    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 👷 Worker assigned (Rapido-style locking)
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // 🔥 JOB LIFECYCLE (VERY IMPORTANT)
    status: {
      type: String,
      enum: ["posted", "available", "accepted", "on_the_way", "completed"],
      default: "posted",
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;