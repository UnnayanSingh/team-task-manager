import Project from "../models/Project.model.js";

export const isProjectAdmin = async (req, res, next) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) return res.status(404).send("Project not found");

  const isAdmin = project.members.some(
    (m) => m.user.toString() === req.user.id && m.role === "admin"
  );

  if (!isAdmin) return res.status(403).send("Access denied");

  next();
};