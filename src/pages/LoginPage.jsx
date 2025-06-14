import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("optic_user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("optic_logged_in", "true");
      toast.success("Login successful 🎉", {
        onClose: () => navigate("/"),
        autoClose: 1500,
      });
    } else {
      setError("Invalid email or password");
      toast.error("Login failed. Please check credentials.", {
        autoClose: 2000,
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-lg overflow-hidden flex w-full max-w-4xl">
        {/* Left image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="assets/glasses.jpg"
            alt="Eyewear"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Login form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 font-semibold">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
