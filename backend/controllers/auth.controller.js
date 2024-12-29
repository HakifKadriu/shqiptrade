import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cryptojs from "crypto-js";
import dotenv from "dotenv";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mail/brevo.js";

dotenv.config();

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiration: Date.now() + 15 * 60 * 1000, // 15 minutes
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    // await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resendVerificationToken = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiration = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please provide the verification code",
      });
    }

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.verificationToken = undefined;
    user.verificationTokenExpiration = undefined;
    user.isVerified = true;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = cryptojs.randomBytes(20).toString("hex");

    user.resetPasswordCode = resetToken;
    user.resetPasswordCodeExpiration = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    await user.save();

    await sendResetPasswordEmail(
      user.email,
      user.username,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.json({
      success: true,
      message: "Reset password link sent successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordCode: token,
      resetPasswordCodeExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found or token expired" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // send email notification
    await sendResetPasswordSuccessEmail(user.email, user.username);

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
