import express from "express";
import {
  loginUser,
  registerUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyOtp,
  completeOnboarding,
  sendPhoneOtp,
  verifyEmail
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

//Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
//Forgot Password Routes
router.post("/password-reset-request", forgotPassword);
router.post("/reset-password/", resetPassword);
router.post("/send-otp", sendOtp);
router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-otp", verifyOtp);
router.post('/verify-email',verifyEmail)
//Protected Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
//Get All Users
router.get("/", getUsers);
//Get User By ID
router.get("/:id", getUserById);
//Update User By ID
router.put("/:id", updateUserById);
//Delete User By ID
router.delete("/:id", deleteUser);

// Onboarding Completion Route
router.post("/complete-onboarding", completeOnboarding);
export default router;
