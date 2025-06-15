import React, { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: FiHome, path: "/admin/dashboard" },
  { name: "Products", icon: FiBox, path: "/admin/products" },
  { name: "Orders", icon: FiShoppingCart, path: "/admin/orders" },
  { name: "Customers", icon: FiUsers, path: "/admin/customers" },
  { name: "Settings", icon: FiSettings, path: "/admin/settings" },
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
      className={`h-screen bg-white shadow-md flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed ? (
          <span className="text-xl font-bold text-primary">Vision Optic</span>
        ) : (
          <span className="text-xl font-bold text-primary">VO</span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-secondary hover:rotate-90 transition-transform"
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-4 space-y-2 px-2">
        {menuItems.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={name}
              onClick={() => handleNavigation(path)}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                }
              `}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
