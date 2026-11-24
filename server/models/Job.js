import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      maxlength: 150,
    },

    role: {
      type: String,
      required: true,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },

    date: {
      type: String,
      required: true,
    },

    interview: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      maxlength: 3000,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
