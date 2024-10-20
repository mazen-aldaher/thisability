import express from "express";
import twilio from "twilio";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import mongoose from "mongoose";
import { sendEmail } from "../util/sendEmail.js";

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role, firstName, lastName } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before saving
  //const hashedPassword = await bcrypt.hash(password, 10);
  // Step 1: Create New User without profile reference
  const newUser = new User({
    username,
    email,
    password, // store hashed password
    role: role || "user", // default role to 'user' if not provided
    isVerified: false,
  });

  // Save User first to get the user ID
  const savedUser = await newUser.save();

  // Step 2: Create New Profile linked to the user
  const newProfile = new Profile({
    firstName,
    lastName,
    user: savedUser._id, // Associate profile with the newly created user
  });

  // Save Profile
  const savedProfile = await newProfile.save();

  // Step 3: Update the user to reference the profile
  savedUser.profile = savedProfile._id;
  await savedUser.save();

  // Step 5: Generate verification token (you can use JWT or another method)
  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set token expiration as needed
  });

  // Step 6: Send verification email
  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
  const emailContent = `
    <h1>Verify Your Email</h1>
    <p>Please click the link below to verify your email:</p>
    <a href="${verificationLink}">Verify Email</a>
  `;

  try {
    await sendEmail(
      savedUser.email,
      "Verify Your Email for Thisability",
      emailContent
    );
    res.status(201).json({
      message: "User registered. Verification email sent.",
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      role: savedUser.role,
      profile: savedProfile, // Return profile with user info
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({
      message: "User registered, but failed to send verification email.",
    });
  }
});
// Authenticate user & get token
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email }).populate("profile");

  if (!user) {
    console.log("User not found for email: ", email); // Log for debugging
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if the user is verified
  if (!user.isVerified) {
    console.log("User not verified: ", email); // Log for debugging
    return res
      .status(403)
      .json({ message: "Please verify your email before logging in." });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Password does not match for user: ", email); // Log for debugging
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // If successful, send back user data and token
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profile: user.profile, // Include profile details (firstName, lastName, etc.)
    token: generateToken(user._id),
  });
});

// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("profile")
      .select("-password");

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile, // Include the populated profile
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Ensure you're fetching the user based on the token
  const user = await User.findById(userId).populate("profile");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user profile fields
  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  // Update Profile fields
  if (user.profile) {
    user.profile.firstName = req.body.firstName || user.profile.firstName;
    user.profile.lastName = req.body.lastName || user.profile.lastName;

    // Save updated profile
    await user.profile.save();
  }

  // If the password is being updated, make sure it's hashed
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  // Save updated user
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    profile: updatedUser.profile, // Ensure profile is returned
    token: generateToken(updatedUser._id),
  });
});

// Forgot password
// Forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found." });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  const emailContent = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">Reset Password</a>
  `;

  await sendEmail(user.email, "Reset Your Password for Thisability", emailContent);
  res.json({ message: "Password reset email sent." });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const token = req.query.token;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
});

// Get All Users (Admin)
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("profile");
  res.json(users);
});

// Get User by ID (Admin)
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("profile");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update User by ID (Admin)
export const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("profile");

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Delete User (Admin)

export const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user using deleteOne
    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ message: "Server error, unable to delete user" });
  }
});

// Complete Onboarding
export const completeOnboarding = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isOnboardingComplete = true;
  await user.save();

  res.status(200).json({ message: "Onboarding completed successfully" });
});

// Send Phone OTP with twilio
export const sendPhoneOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `Your OTP is ${otp}`;
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
      body: message,
    })
    .then((message) => console.log(message.sid))
    .done();
  res.json({ message: "OTP sent successfully" });
});

// verify-phone-otp-with twilio
export const verifyPhoneOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  // Check if the OTP is valid
  const user = await User.findOne({ phone });
  if (!user) return res.status(404).send("User not found");

  // Issue JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Send OTP
export const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  user.otp = otp;
  user.otpExpires = Date.now() + 3600000; // OTP valid for 1 hour

  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}.

Your OTP code is ${otp}. This code will expire in 1 hour.`,
  });

  res.json({ message: "OTP sent to email" });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "OTP has expired or is invalid" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Clear the OTP after successful verification
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.json({ message: "OTP verified successfully" });
});

//Verify-email token route
export const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.body.token; // Change to req.body.token for POST requests
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).send("Invalid user");

    // Update user as verified
    user.isVerified = true;
    await user.save();

    res.send("Email verified successfully!");
  } catch (error) {
    res.status(400).send("Invalid token or token expired.");
  }
});

export default router;
