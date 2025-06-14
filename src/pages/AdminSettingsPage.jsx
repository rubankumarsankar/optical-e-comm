import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminSettingsPage() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    theme: "light",
    notifications: true,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_settings"));
    if (saved) setAdmin(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("admin_settings", JSON.stringify(admin));
    toast.success("Settings updated successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Admin Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>

        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            name="theme"
            value={admin.theme}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="notifications"
            checked={admin.notifications}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label className="text-sm text-gray-700">Enable Notifications</label>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
