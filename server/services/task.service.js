import Task from "../models/Task.model.js";

export const createTaskService = async (data) => {
  return Task.create(data);
};

export const getTasksByProject = async (projectId) => {
  return Task.find({ project: projectId });
};