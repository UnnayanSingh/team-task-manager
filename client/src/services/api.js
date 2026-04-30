import axios from "axios";

export const api = axios.create({
  baseURL: "https://team-task-manager-w4wf.onrender.com/api"
});