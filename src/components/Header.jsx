import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCoin } from "../redux/slices/cryptoSlice";

const Header = () => {
  const dispatch = useDispatch();
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);

  const handleChange = (e) => {
    dispatch(setSelectedCoin(e.target.value));
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md flex flex-wrap items-center justify-between">
      <nav className="flex gap-6">
        <HeaderLink to="/" text="Dashboard" />
        <HeaderLink to="/overview" text="Overview" />
        <HeaderLink to="/history" text="History" />
      </nav>

      <select
        value={selectedCoin}
        onChange={handleChange}
        className="p-2 border border-gray-600 bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
      </select>
    </header>
  );
};

const HeaderLink = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `relative text-sm font-medium transition ${
        isActive
          ? "text-blue-400"
          : "text-gray-300 hover:text-white after:block after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
      }`
    }
  >
    {text}
  </NavLink>
);

export default Header;
