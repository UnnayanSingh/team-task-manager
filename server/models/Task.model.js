import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo"
    },

    deadline: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);