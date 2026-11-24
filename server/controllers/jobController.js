
import Job from "../models/Job.js";

// Allow only permitted application fields
function getJobFields(body) {
  const fields = {};

  const allowedFields = [
    "company",
    "role",
    "status",
    "date",
    "interview",
    "notes",
  ];

  for (const field of allowedFields) {
    if (typeof body[field] === "string") {
      fields[field] = body[field].trim();
    }
  }

  return fields;
}

// Get all applications for the current user
export async function getJobs(req, res, next) {
  try {
    const jobs = await Job.find({
      owner: req.userId,
    }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    next(error);
  }
}

// Create a new application
export async function createJob(req, res, next) {
  try {
    const job = await Job.create({
      ...getJobFields(req.body),
      owner: req.userId,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
}

// Update an existing application
export async function updateJob(req, res, next) {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.userId,
      },
      getJobFields(req.body),
      {
        new: true,
        runValidators: true,
      },
    );

    if (!job) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
}

// Delete an application
export async function deleteJob(req, res, next) {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      owner: req.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
