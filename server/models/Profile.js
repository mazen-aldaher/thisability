import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, trim: true },
    avatar: { type: String },
    lastName: { type: String, trim: true },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String, trim: true },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    idNumber: { type: String, trim: true },
    idDocument: { type: String }, // URL or path to the ID document
    profilePicture: { type: String }, // URL or path to the profile picture
    bio: { type: String, trim: true },
    website: { type: String, trim: true },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
    // Artist profile information
    artStyle: { type: String, trim: true },
    portfolioUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
