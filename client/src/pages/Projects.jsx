import { useState, useEffect, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [memberId, setMemberId] = useState(""); // 🔥 team feature

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  // 🔹 Create Project
  const createProject = async () => {
    if (!name.trim()) return;

    try {
      await api.post(
        "/projects",
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  // 🔹 Add Member (Team Feature)
  const addMember = async (projectId) => {
    if (!memberId.trim()) return;

    try {
      await api.post(
        `/projects/${projectId}/add-member`,
        { userId: memberId, role: "member" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Member added");
      setMemberId("");
    } catch (err) {
      console.error("Error adding member:", err);
      alert("Failed to add member");
    }
  };

  // 🔹 Load Projects
  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Projects</h2>

      {/* 🔥 Create Project */}
      <div className="card">
        <h3>Create New Project</h3>

        <input
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          style={{ width: "100%" }}
          disabled={!name.trim()}
          onClick={createProject}
        >
          Create Project
        </button>
      </div>

      {/* 🔥 Project List */}
      {projects.length === 0 ? (
        <p style={{ textAlign: "center" }}>No projects yet</p>
      ) : (
        projects.map((p) => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>

            {/* 🔥 Navigation */}
            <button onClick={() => navigate(`/tasks/${p._id}`)}>
              Open Tasks
            </button>

            {/* 🔥 Add Member (Team Feature) */}
            <div style={{ marginTop: "10px" }}>
              <input
                placeholder="Enter User ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              />

              <button onClick={() => addMember(p._id)}>
                Add Member
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}