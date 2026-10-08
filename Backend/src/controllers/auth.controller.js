import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { config } from "../config/config.js";

const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000;

function sendTokenResponse(user, res, statusCode, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_LIFETIME_MS,
    path: "/",
  });

  return res.status(statusCode).json({
    message,
    user: {
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
  });
}

export const registerUser = async (req, res) => {
  const { email, phoneNumber, password, role } = req.body ?? {};

  if (!email || !phoneNumber || !password) {
    return res
      .status(400)
      .json({ message: "Email, phone number, and password are required" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhoneNumber = phoneNumber.trim();
    const existingUser = await userModel.findOne({
      $or: [{ email: normalizedEmail }, { phoneNumber: normalizedPhoneNumber }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User with this email or phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email: normalizedEmail,
      phoneNumber: normalizedPhoneNumber,
      password: hashedPassword,
      ...(role && { role }),
    });

    return sendTokenResponse(user, res, 201, "Registration successful");
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return sendTokenResponse(user, res, 200, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
