import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Overview = () => {
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!selectedCoin) return;

    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
      .then((response) => response.json())
      .then((data) => {
        setOverviewData({
          marketCap: data.market_data.market_cap.usd,
          totalSupply: data.market_data.total_supply,
          circulatingSupply: data.market_data.circulating_supply,
          allTimeHigh: data.market_data.ath.usd,
          rank: data.market_cap_rank,
        });
        setDescription(data.description.en); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching overview:", error);
        setLoading(false);
      });
  }, [selectedCoin]);

  return (
    <div className="w-full p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        📊 Crypto Overview
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 h-24 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <OverviewCard
              title="Market Cap"
              value={`$${overviewData.marketCap.toLocaleString()}`}
            />
            <OverviewCard
              title="Total Supply"
              value={overviewData.totalSupply ? overviewData.totalSupply.toLocaleString() : "N/A"}
            />
            <OverviewCard
              title="Circulating Supply"
              value={overviewData.circulatingSupply.toLocaleString()}
            />
            <OverviewCard
              title="All-Time High"
              value={`$${overviewData.allTimeHigh.toFixed(2)}`}
            />
            <OverviewCard
              title="Rank"
              value={`#${overviewData.rank}`}
            />
          </div>
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)}
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {description ? description.split(".")[0] + "." : "No description available."}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const OverviewCard = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <h4 className="text-sm text-gray-600 font-medium">{title}</h4>
      <p className="text-lg font-semibold text-blue-700 mt-1">{value}</p>
    </div>
  );
};

export default Overview;

