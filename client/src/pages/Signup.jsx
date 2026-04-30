import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      return alert("All fields required");
    }

    try {
      await api.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container auth-box">
      <div className="card">
        <h2 style={{ textAlign: "center" }}>Signup</h2>

        <input
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button style={{ width: "100%" }} onClick={handleSignup}>
          Signup
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
            cursor: "pointer",
            color: "#6366f1",
            fontWeight: "500"
          }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}