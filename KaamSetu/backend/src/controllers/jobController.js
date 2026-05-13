import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, location, salary, skillsRequired } = req.body;

    const job = await Job.create({
      title,
      description,
      location,
      salary,
      skillsRequired,
      contractor: req.user?._id || null,
      status: "available",
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("contractor", "name email")
      .populate("worker", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAvailableJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "available" })
      .populate("contractor", "name email")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const bookJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.status !== "available") {
      return res.status(400).json({
        message: "Job is already booked",
      });
    }

    job.worker = req.user?._id || null;
    job.status = "accepted";

    await job.save();

    res.json({
      message: "Job booked successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "posted",
      "available",
      "accepted",
      "on_the_way",
      "completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid job status",
      });
    }

    const job = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json({
      message: "Job status updated",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const { skills } = req.body;

    const jobs = await Job.find({
      status: "available",
      skillsRequired: {
        $in: skills,
      },
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};