import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Validate environment variables
if (
  !process.env.MONGODB_URI ||
  !process.env.JWT_SECRET ||
  process.env.JWT_SECRET.length < 32
) {
  throw new Error("Missing or invalid environment variables");
}

// Initialize Express
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN ||
      "http://localhost:5173",
  })
);

app.use(express.json({ limit: "32kb" }));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "JobTrack API is running" });
});

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// API routes
app.use("/api", authRoutes);
app.use("/api", jobRoutes);

// Centralized error handling
app.use(errorHandler);

// Start local server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export Express application
export default app;