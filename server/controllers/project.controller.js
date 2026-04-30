import Project from "../models/Project.model.js";

// ✅ Create Project (Admin = creator)
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [{ user: req.user.id, role: "admin" }]
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};

// ✅ Get all projects (user is member)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      "members.user": req.user.id
    }).populate("members.user", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// 🔥 NEW: Get single project (IMPORTANT)
export const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members.user", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error fetching project" });
  }
};

// ✅ Add member (only admin)
export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isAdmin = project.members.some(
      m => m.user.toString() === req.user.id && m.role === "admin"
    );

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admin allowed" });
    }

    project.members.push({ user: userId, role });
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error adding member" });
  }
};