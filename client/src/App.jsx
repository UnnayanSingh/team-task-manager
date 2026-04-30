import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Navbar from "./components/Navbar.jsx";

import { AuthContext } from "./context/AuthContext";

// 🔒 Protected Route
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Routes>

      {/* 🔓 Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔒 Protected Routes with Navbar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Dashboard />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Projects />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:projectId"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Tasks />
            </>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;