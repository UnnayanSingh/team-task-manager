import { useState, useContext } from "react";
import { api } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter email and password");
    }

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container auth-box">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={{ width: "100%" }} onClick={handleLogin}>
          Login
        </button>

        {/* Signup Navigation */}
        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            cursor: "pointer",
            color: "#6366f1",
            fontWeight: "500"
          }}
          onClick={() => navigate("/signup")}
        >
          Don’t have an account? Signup
        </p>
      </div>
    </div>
  );
}