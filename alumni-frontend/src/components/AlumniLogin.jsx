// AlumniLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlumniLogin = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Store in localStorage (simulate login)
    localStorage.setItem("alumniName", name);
    navigate("/");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Alumni Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AlumniLogin;
