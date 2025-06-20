import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Default redirect path or return to the originally requested protected route
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials check
    if (email === "admin@admin.com" && password === "admin123") {
      localStorage.setItem("admin_logged_in", "true");
      navigate(from, { replace: true });
    } else {
      alert("Invalid admin credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/20 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border border-secondary rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-primary"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary">Password</label>
            <input
              type="password"
              className="mt-1 block w-full border border-secondary rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-primary"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
