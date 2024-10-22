import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from "validator";
const { isEmail } = pkg;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: { type: String, unique: true },
    googleId: { type: String },
    facebookId: { type: String },
    appleId: { type: String },
    role: {
      type: String,
      enum: ["user", "artist", "admin","organization"],
      default: "user",
    },
    isOnboardingComplete: { type: Boolean, default: false },

    // Profile reference
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },

    // Other fields
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    suspended: { type: Boolean, default: false },
    verificationNotes: { type: String, trim: true },

    // OTP for email verification
    isVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  { timestamps: true }
);

// Indexing
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 });
userSchema.index({ resetPasswordToken: 1 });
userSchema.index({ emailVerificationToken: 1 });

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate OTP for email verification
userSchema.methods.generateEmailVerificationToken = function () {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.emailVerificationToken = bcrypt.hashSync(otp, 10);
  this.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  return otp;
};

// Method to validate the OTP
userSchema.methods.validateEmailVerificationToken = async function (
  enteredOtp
) {
  return bcrypt.compare(enteredOtp, this.emailVerificationToken);
};

const User = mongoose.model("User", userSchema);

export default User;
