import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    console.log("Profile clicked");
    navigate("/admin/settings"); 
    // navigate("/profile"); // Enable if needed
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="border border-secondary rounded-md px-4 py-2 w-full max-w-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Right Side: Notification and Profile */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <FiBell className="text-secondary hover:text-primary cursor-pointer" size={20} />

        {/* Profile button with avatar icon */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 hover:text-primary text-sm"
        >
          {/* Avatar icon circle */}
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary/20">
            <FiUser className="text-secondary" size={20} />
          </span>

          {/* Name & role */}
          <div className="text-left hidden sm:block">
            <p className="font-medium text-secondary"></p>
            <p className="text-xs text-secondary">Admin</p>
          </div>

          <FiChevronDown className="text-secondary" />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 w-44 bg-white border rounded shadow z-50">
            <button
              onClick={handleProfile}
              className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 flex items-center gap-2"
            >
              <FiUser /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
