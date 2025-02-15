import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const historicalData = useSelector((state) => state.crypto.historicalData);

  const lastUpdated = historicalData?.prices?.length
    ? new Date(historicalData.prices.slice(-1)[0][0]).toLocaleString()
    : "Not Available";

  return (
    <footer className="bg-gray-900 text-white text-center p-4 mt-6">
      <p className="text-sm">
        📅 Last Updated: <span className="font-semibold">{lastUpdated}</span>
      </p>
    </footer>
  );
};

export default Footer;
