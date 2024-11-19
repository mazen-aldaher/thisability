// server/routes/faceVerification.js
import express from "express";
import multer from "multer";
import AWS from "aws-sdk";
import User from "../models/User.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const rekognition = new AWS.Rekognition();

router.post("/user-face-verify", async (req, res) => {
  try {
    const { image, email } = req.body;

    if (!image || !email) {
      return res.status(400).json({ error: "Missing image or email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const params = {
      SourceImage: { Bytes: Buffer.from(image, "base64") },
      TargetImage: { Bytes: Buffer.from(user.faceData, "base64") },
      SimilarityThreshold: 90,
    };

    const response = await rekognition.compareFaces(params).promise();
    const verified = response.FaceMatches.length > 0;
    res.json({ verified });
  } catch (error) {
    console.error("Face verification error:", error);
    res.status(500).json({ error: "Face verification failed" });
  }
});


export default router;
