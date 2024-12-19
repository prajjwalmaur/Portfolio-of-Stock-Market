import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apikey = "ETRYTBBGD78CKW4H";
  // const apikey = "demo";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = Cookies.get('userId');

      if (!userId) {
        alert('You are not logged in. Redirecting to login page.');
        navigate('/login');
        return;
      }

      try {
        // Fetch stocks from backend
        const response = await axios.get(`http://localhost:8080/api/stocks?userId=${userId}`);
        const stockList = response.data;

        let total = 0;
        let highestStock = null;

        // Fetch current prices for all stocks and calculate metrics
        const stockPromises = stockList.map(async (stock) => {
          const { ticker, quantity, buy_price } = stock;

          // Fetch latest price using Alpha Vantage API
          const apiResponse = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`
          );

          const dailyData = apiResponse.data['Time Series (Daily)'];
          const latestDate = Object.keys(dailyData)[0]; // Get the latest date
          const currentPrice = parseFloat(dailyData[latestDate]['4. close']); // Get closing price

          const stockValue = currentPrice * quantity;
          total += stockValue;

          // Determine the top-performing stock
          if (!highestStock || stockValue > highestStock.value) {
            highestStock = {
              name: stock.name,
              ticker,
              value: stockValue,
              currentPrice,
            };
          }

          return {
            ...stock,
            currentPrice,
            stockValue,
          };
        });

        const updatedStocks = await Promise.all(stockPromises);

        // Set state with calculated data
        setStocks(updatedStocks);
        setTotalValue(total.toFixed(2));
        setTopStock(highestStock);

        // Prepare chart data for portfolio distribution
        const distribution = updatedStocks.map((stock) => ({
          label: stock.name,
          value: stock.stockValue,
        }));

        setChartData({
          labels: distribution.map((item) => item.label),
          datasets: [
            {
              data: distribution.map((item) => item.value),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        alert('Failed to fetch dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Portfolio Value</h5>
                  <p className="card-text">${totalValue}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Top-Performing Stock</h5>
                  {topStock ? (
                    <p className="card-text">
                      {topStock.name} ({topStock.ticker}) - ${topStock.currentPrice.toFixed(2)}
                    </p>
                  ) : (
                    <p className="card-text">No data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4>Portfolio Distribution</h4>
            {chartData ? (
              <Pie data={chartData} />
            ) : (
              <p>No distribution data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
