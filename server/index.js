
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
  }),
);

app.use(express.json({ limit: "32kb" }));

// API routes
app.use("/api", authRoutes);
app.use("/api", jobRoutes);

// Centralized error handling
app.use(errorHandler);

// Connect database and start server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("JobTrack API ready");
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
