import bcrypt from "bcryptjs";

import { generateToken } from "../utils/token.js";
import User from "../models/User.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "Error",
        message: "User already exists"
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    res.status(201).json({
      staus: "Success",
      message: "User registered successfully",
      data: {
        access_token: generateToken(newUser._id),
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Login user and return JWT token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        status: "Success",
        message: "User logged in successfully",
        data: {
          access_token: generateToken(user._id),
          id: user._id,
          username: user.username,
          email: user.email
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different from the current password" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 
    res.json({
      status: "Success",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        progress: user.progress
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

// Update user profile
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();  
    res.json({
      status: "Success",
      message: "Profile updated successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      status: "Success",
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};