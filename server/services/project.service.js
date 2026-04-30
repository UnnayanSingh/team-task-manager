import Project from "../models/Project.model.js";

export const createProjectService = async (data) => {
  return Project.create(data);
};

export const getUserProjects = async (userId) => {
  return Project.find({ "members.user": userId });
};