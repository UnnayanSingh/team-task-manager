import express from "express";
const app = express();

app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// your routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

export default app;