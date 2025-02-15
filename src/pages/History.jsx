import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const History = () => {
  const selectedCoin = useSelector((state) => state.crypto.selectedCoin);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    if (!selectedCoin) return;

    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=7`
    )
      .then((response) => response.json())
      .then((data) => {
        setHistoryData(
          data.prices.map(([date, price], index) => ({
            date: new Date(date).toLocaleDateString(),
            price: price.toFixed(2),
            volume: data.total_volumes[index][1].toLocaleString(),
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
        setLoading(false);
      });
  }, [selectedCoin]);

  const filteredData = historyData.filter((entry) =>
    entry.date.includes(searchDate)
  );

  return (
    <div className="w-full p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        ⏳ Crypto Price History
      </h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by date (MM/DD/YYYY)"
          className="p-3 w-full max-w-md border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg transition-all hover:shadow-xl">
        {loading ? (
          <p className="text-gray-500 text-center">Loading history...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4">Date</th>
                  <th className="p-4">Price (USD)</th>
                  <th className="p-4">24H Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="p-4 text-gray-600">{entry.date}</td>
                      <td className="p-4 font-semibold text-blue-600">
                        ${entry.price}
                      </td>
                      <td className="p-4 text-gray-600">${entry.volume}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No data found for the selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
