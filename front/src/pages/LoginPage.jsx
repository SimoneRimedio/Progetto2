import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });

      if (response.data.message) {
        // Navigate to AdminDashboard upon successful login
        navigate("/AdminDashboard");
      } else {
        console.error("Login failed: ", response.data.message);
        alert("Credenziali di accesso non valide.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 401) {
          console.error("Unauthorized: ", error.response.data.error);
          alert("Credenziali di accesso non valide.");
        } else {
          console.error("Error response: ", error.response.data);
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received: ", error.request);
      } else {
        // Something else caused the error
        console.error("Error setting up request: ", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
