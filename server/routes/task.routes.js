import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", auth, createTask);
router.get("/:projectId", auth, getTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

export default router;