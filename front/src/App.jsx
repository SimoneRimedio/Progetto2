import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/Admindashboard";
import HomePage from "./pages/Homepage";
import Page404 from "./pages/Page404";
import RequireAuth from "./components/Autenticate/RequireAuth";
import { AuthProvider } from "./components/Autenticate/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

const RequireAuth = () => {
  return <Navigate to="/login" replace />;
};

export default App;