import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentPrice,
  fetchHistoricalData,
} from "../redux/slices/cryptoSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedCoin, currentPrice, historicalData } = useSelector(
    (state) => state.crypto
  );

  useEffect(() => {
    if (selectedCoin) {
      dispatch(fetchCurrentPrice(selectedCoin));
      dispatch(fetchHistoricalData(selectedCoin));
    }
  }, [dispatch, selectedCoin]);

  const chartData = {
    labels: historicalData?.prices.map((price) =>
      new Date(price[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price in USD",
        data: historicalData?.prices.map((price) => price[1]),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { callback: (value) => `$${value}` },
      },
    },
  };

  return (
    <div className="p-6 w-full bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Crypto Dashboard
      </h2>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        {currentPrice ? (
          <div>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              Current Price:
              <span className="text-blue-600 dark:text-blue-400">
                {" "}
                ${currentPrice[selectedCoin]?.usd.toFixed(2)}
              </span>
            </p>
            <p
              className={`text-lg ${
                currentPrice[selectedCoin]?.usd_24h_change >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              24h Change:{" "}
              {currentPrice[selectedCoin]?.usd_24h_change.toFixed(2)}%
            </p>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Loading current price...
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
          Price Trend (Last 7 Days)
        </h3>
        {historicalData ? (
          <div className="h-80 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Loading historical data...
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
