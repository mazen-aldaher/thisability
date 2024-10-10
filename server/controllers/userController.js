import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// Authenticate user & get token
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, googleIdToken } = req.body;

  if (googleIdToken) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleIdToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      let user = await User.findOne({ email: googleEmail });
      if (!user) {
        user = await User.create({
          username: payload.name,
          email: googleEmail,
          googleId: payload.sub,
          role: "user",
          status: "Account Active",
        });
      }

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } catch (error) {
      res.status(401).json({ message: "Google authentication failed" });
    }
  } else {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  }
});

// Forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/reset-password/${token}`;

  await transporter.sendMail({
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: "Password Reset",
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please make a PUT request to the following link to complete the process:\n\n${resetUrl}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  });

  res.json({ message: "Password reset link sent to email" });
});

// Reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res
      .status(400)
      .json({ message: "Password reset token is invalid or has expired" });
    return;
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json({ message: "Password has been updated" });
});

// Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Get a user by ID
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update user by ID
export const updateUserById = asyncHandler(async (req, res) => {
 
});

// Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Complete onboarding
export const completeOnboarding = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.isOnboardingComplete = true;
  await user.save();

  res.status(200).json({ message: "Onboarding completed successfully" });
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

  const mailOptions = {
    to: user.email,
    from: process.env.GMAIL_USER,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 1 hour.`,
  };

  await transporter.sendMail(mailOptions);

  res.json({ message: "OTP sent to email" });
});

// Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.otp !== otp || Date.now() > user.otpExpires) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.json({ message: "OTP verified successfully" });
});

// Update user profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const fieldsToUpdate = [
    "username",
    "email",
    "firstName",
    "lastName",
    "dateOfBirth",
    "phoneNumber",
    "address",
    "idNumber",
    "profilePicture",
    "bio",
    "website",
    "socialLinks",
    "artStyle",
    "portfolioUrl",
    "isOnboardingComplete",
    "idDocument",
    "profile",
  ];

  fieldsToUpdate.forEach((field) => {
    if (field === "profile" && req.body[field]) {
      user[field] = new mongoose.Types.ObjectId(req.body[field]);
    } else if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
    firstName: updatedUser.firstName,
    lastName: updatedUser.lastName,
    dateOfBirth: updatedUser.dateOfBirth,
    phoneNumber: updatedUser.phoneNumber,
    address: updatedUser.address,
    idNumber: updatedUser.idNumber,
    idDocument: updatedUser.idDocument,
    profilePicture: updatedUser.profilePicture,
    bio: updatedUser.bio,
    website: updatedUser.website,
    socialLinks: updatedUser.socialLinks,
    artStyle: updatedUser.artStyle,
    portfolioUrl: updatedUser.portfolioUrl,
    isOnboardingComplete: updatedUser.isOnboardingComplete,
    profile: updatedUser.profile,
    token: generateToken(updatedUser._id),
  });
});
// Get user profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      address: user.address,
      idNumber: user.idNumber,
      profilePicture: user.profilePicture,
      bio: user.bio,
      website: user.website,
      socialLinks: user.socialLinks,
      artStyle: user.artStyle,
      portfolioUrl: user.portfolioUrl,
      isOnboardingComplete: user.isOnboardingComplete,
      idDocument: user.idDocument,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export default router;
