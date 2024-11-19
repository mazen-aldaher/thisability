import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieSession from "cookie-session";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import faceVerificationRoutes from "./routes/faceVerification.js";
// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Middleware Setup
app.set("trust proxy", 1); // Trust first proxy if behind one (required for rate-limit middleware)

app.use(morgan(NODE_ENV === "production" ? "common" : "dev")); // Logging middleware
app.use(helmet()); // Security middleware to set HTTP headers
app.use(xss()); // XSS protection middleware
app.use(mongoSanitize()); // Prevent NoSQL injection attacks
app.use(cors({ origin: "http://localhost:3000" })); // Enable Cross-Origin Resource Sharing

// Rate limiting middleware
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    keyGenerator: (req) => req.ip, // Use IP directly for rate limiting
  })
);

// Cookie session setup
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY1, process.env.SESSION_KEY2], // Use environment variables for keys
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: NODE_ENV === "production", // Secure cookies in production
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: "strict", // Ensures cookies are sent only to the same site
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" })); // Adjust size limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Adjust size limit as needed

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", routes);
app.use("/api", faceVerificationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
