import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agree) newErrors.agree = "Please accept terms";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      localStorage.setItem("optic_user", JSON.stringify(formData));
      toast.success("Account Created Successfully 🎉", {
        onClose: () => navigate("/signin"),
        autoClose: 2000,
      });
    } else {
      toast.error("Please fix the errors above!", { autoClose: 2000 });
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      <div className="bg-white shadow-xl rounded-lg overflow-hidden flex w-full max-w-4xl">
        {/* Left image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="assets/glasses.jpg"
            alt="Frame"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm mb-4">
            Join us to explore our premium eyewear collection
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agree && <p className="text-red-500">{errors.agree}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
            >
              Create Account
            </button>

            <p className="text-sm mt-3 text-center">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 font-semibold">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
