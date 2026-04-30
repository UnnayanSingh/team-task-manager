import Task from "../models/Task.model.js";

// 🔹 Dashboard stats (User-specific)
export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // 🔹 Get only tasks assigned to current user
    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;

    const completed = tasks.filter(
      (t) => t.status === "completed"
    ).length;

    const pending = tasks.filter(
      (t) => t.status !== "completed"
    ).length;

    const overdue = tasks.filter(
      (t) =>
        t.deadline &&
        new Date(t.deadline) < now &&
        t.status !== "completed"
    );

    res.json({
      total,
      completed,
      pending,
      overdue
    });
  } catch (error) {
    next(error);
  }
};