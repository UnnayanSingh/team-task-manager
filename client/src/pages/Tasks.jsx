import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Tasks() {
  const { projectId } = useParams();
  const { token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔹 Extract user ID from token
  const getUserId = () => {
    try {
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };

  const userId = getUserId();

  // 🔹 Fetch members + role
  const fetchMembers = async () => {
    try {
      const res = await api.get(`/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMembers(res.data.members || []);

      const currentUser = res.data.members?.find(
        (m) => m.user._id === userId
      );

      setIsAdmin(currentUser?.role === "admin");
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 🔹 Create task
  const createTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post(
        "/tasks",
        {
          project: projectId,
          title,
          assignedTo: assignedTo || userId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      setAssignedTo("");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // 🔹 Update task
  const updateTask = async (id) => {
    try {
      await api.put(
        `/tasks/${id}`,
        { status: "completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // 🔹 Load data
  useEffect(() => {
    if (!token || !projectId) return;
    fetchTasks();
    fetchMembers();
  }, [token, projectId]);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Tasks</h2>

      {/* 🔥 ADMIN CREATE SECTION */}
      {isAdmin && (
        <div className="card">
          <h3>Create Task</h3>

          <input
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Assign to me</option>
            {members.map((m) => (
              <option key={m.user._id} value={m.user._id}>
                {m.user.name}
              </option>
            ))}
          </select>

          <button
            style={{ width: "100%" }}
            disabled={!title.trim()}
            onClick={createTask}
          >
            Add Task
          </button>
        </div>
      )}

      {/* 🔥 TASK LIST */}
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks yet</p>
      ) : (
        tasks.map((t) => (
          <div className="card" key={t._id}>
            <h3>{t.title}</h3>

            <p className={`status ${t.status}`}>
              Status: {t.status}
            </p>

            <p>
              Assigned To: {t.assignedTo?.name || "Unassigned"}
            </p>

            {t.status !== "completed" && (
              <button onClick={() => updateTask(t._id)}>
                Mark Complete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}