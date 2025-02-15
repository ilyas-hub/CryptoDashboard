import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiBarChart2, FiGrid, FiClock, FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-4 bg-gray-800 text-white w-full flex gap-2  justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>💰</div>
        <span> CryptoDash</span>
        <FiMenu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 w-64 bg-gray-800 p-6 text-white min-h-screen z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-xl font-bold text-center mb-6">💰 CryptoDash</h1>

        <nav className="flex flex-col gap-4">
          <SidebarLink to="/" icon={<FiGrid />} text="Dashboard" />
          <SidebarLink to="/overview" icon={<FiBarChart2 />} text="Overview" />
          <SidebarLink to="/history" icon={<FiClock />} text="History" />
        </nav>
      </aside>
    </>
  );
};

const SidebarLink = ({ to, icon, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-md transition ${
        isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700"
      }`
    }
  >
    {icon} {text}
  </NavLink>
);

export default Sidebar;
