import Task from "../models/Task.model.js";
import Project from "../models/Project.model.js";

// 🔹 Create Task (Admin only)
export const createTask = async (req, res, next) => {
  try {
    const { project, title, assignedTo, deadline } = req.body;

    if (!project || !title) {
      return res.status(400).json({ message: "Project and title are required" });
    }

    const proj = await Project.findById(project);

    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check admin
    const member = proj.members.find(
      (m) => m.user.toString() === req.user.id
    );

    if (!member || member.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can create/assign tasks",
      });
    }

    // ✅ Validate assigned user (must be project member)
    if (assignedTo) {
      const isMember = proj.members.some(
        (m) => m.user.toString() === assignedTo
      );

      if (!isMember) {
        return res.status(400).json({
          message: "Assigned user must be part of the project",
        });
      }
    }

    const task = await Task.create({
      project,
      title,
      assignedTo: assignedTo || null,
      deadline: deadline || null,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// 🔹 Get Tasks by Project (UPDATED WITH SECURITY + POPULATE)
export const getTasks = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check membership
    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Fetch tasks with populated fields
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// 🔹 Update Task (Only project members)
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check membership
    const isMember = project.members.some(
      (m) => m.user.toString() === req.user.id
    );

    if (!isMember) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Allowed updates
    if (req.body.status) task.status = req.body.status;
    if (req.body.title) task.title = req.body.title;
    if (req.body.deadline) task.deadline = req.body.deadline;

    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// 🔹 Delete Task (Admin only)
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check admin
    const member = project.members.find(
      (m) => m.user.toString() === req.user.id
    );

    if (!member || member.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete tasks",
      });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};