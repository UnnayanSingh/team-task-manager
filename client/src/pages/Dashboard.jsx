import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      {/* 🔥 Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        <div className="card">
          <h3>Total Tasks</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold" }}>
            {data.total || 0}
          </p>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "green" }}>
            {data.completed || 0}
          </p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p style={{ fontSize: "22px", fontWeight: "bold", color: "orange" }}>
            {data.pending || 0}
          </p>
        </div>
      </div>

      {/* 🔥 Navigation */}
      <div style={{ textAlign: "center", marginTop: "25px" }}>
        <button onClick={() => navigate("/projects")}>
          Go to Projects
        </button>
      </div>
    </div>
  );
}