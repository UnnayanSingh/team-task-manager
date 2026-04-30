import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#6366f1",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white"
      }}
    >
      <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        Task Manager
      </h3>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/projects")}>
          Projects
        </button>

        <button
          style={{ background: "red" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}