import bcrypt from "bcryptjs";

import { generateToken } from "../utils/token.js";
import User from "../models/User.js";

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
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id)
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        status: "Success",
        message: "User logged in successfully",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id)
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};