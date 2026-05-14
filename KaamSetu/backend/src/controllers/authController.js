import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const sendUserResponse = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    location: user.location,
    skills: user.skills,
    isOnline: user.isOnline,
    token: generateToken(user._id),
  });
};

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      location,
      skills,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      location,
      skills,
    });

    sendUserResponse(res, user, 201);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {
      sendUserResponse(res, user);
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOnlineWorkers = async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      isOnline: true,
    });

    res.json(workers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { role, skills, phone, location } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (role) user.role = role;
    if (skills) user.skills = skills;
    if (phone) user.phone = phone;
    if (location) user.location = location;

    await user.save();

    sendUserResponse(res, user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};