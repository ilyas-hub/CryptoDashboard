import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiBarChart2, FiGrid, FiClock, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-52 bg-gray-800 text-white p-4 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-lg font-bold text-center mb-4">💰 CryptoDash</h1>

        <nav className="flex flex-col gap-3">
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
      `flex items-center gap-3 p-2 rounded-md transition ${
        isActive ? "bg-gray-700 text-blue-400" : "hover:bg-gray-700"
      }`
    }
  >
    {icon} {text}
  </NavLink>
);

export default Sidebar;
