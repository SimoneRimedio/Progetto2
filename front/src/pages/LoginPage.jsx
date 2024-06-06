import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Autenticate/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        username,
        password,
      });

      if (response.data.message) {
        login();
        navigate("/admin");
      } else {
        console.error("Login failed: ", response.data.message);
        alert("Credenziali di accesso non valide.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Unauthorized: ", error.response.data.error);
          alert("Credenziali di accesso non valide.");
        } else {
          console.error("Error response: ", error.response.data);
        }
      } else if (error.request) {
        console.error("No response received: ", error.request);
      } else {
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
