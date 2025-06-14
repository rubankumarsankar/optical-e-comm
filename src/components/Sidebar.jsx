import React, { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/admin/dashboard" },
  { name: "Products", icon: <FiBox />, path: "/admin/products" },
  { name: "Orders", icon: <FiShoppingCart />, path: "/admin/orders" },
  { name: "Customers", icon: <FiUsers />, path: "/admin/customers" },
//   { name: "Analytics", icon: <FiBarChart2 />, path: "/admin/analytics" },
  { name: "Settings", icon: <FiSettings />, path: "/admin/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`h-screen bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <span
          className={`text-xl font-bold text-blue-600 transition-all ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Optic Vision
        </span>
        {collapsed && <span className="text-xl font-bold text-blue-600">OV</span>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 ml-auto hover:rotate-90 transition-transform"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col mt-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom Label */}
      <div className="mt-auto p-4 text-center text-xs text-gray-400">
        {collapsed ? "Expand" : "Collapse Sidebar"}
      </div>
    </div>
  );
};

export default Sidebar;
