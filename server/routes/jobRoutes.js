
import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

// Protect all job routes
router.use(auth);

// Get all applications
router.get("/jobs", getJobs);

// Create a new application
router.post("/jobs", createJob);

// Update an application
router.put("/jobs/:id", updateJob);

// Delete an application
router.delete("/jobs/:id", deleteJob);

export default router;
