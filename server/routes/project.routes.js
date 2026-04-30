import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createProject,
  getProjects,
  getSingleProject,   // 🔥 ADD THIS
  addMember
} from "../controllers/project.controller.js";

const router = express.Router();

// ✅ Create project
router.post("/", auth, createProject);

// ✅ Get all projects
router.get("/", auth, getProjects);

// 🔥 NEW: Get single project (VERY IMPORTANT)
router.get("/:id", auth, getSingleProject);

// ✅ Add member (admin only)
router.post("/:projectId/add-member", auth, addMember);

export default router;