import Attendance from "../models/Attendance.js";

export const markAttendance = async (
  req,
  res
) => {
  try {
    const { worker, wage } = req.body;

    const attendance =
      await Attendance.create({
        worker,
        wage,
      });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAttendance =
  async (req, res) => {
    try {
      const attendance =
        await Attendance.find()
          .populate("worker", "name email")
          .sort({
            createdAt: -1,
          });

      res.json(attendance);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };