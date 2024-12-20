import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [topStock, setTopStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apikey = "ETRYTBBGD78CKW4H";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = Cookies.get("userId");

      if (!userId) {
        alert("You are not logged in. Redirecting to login page.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/stocks?userId=${userId}`
        );
        const stockList = response.data;

        let total = 0;
        let highestStock = null;

        const stockPromises = stockList.map(async (stock) => {
          const { ticker, quantity, buy_price } = stock;

          const apiResponse = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apikey}`
          );

          const dailyData = apiResponse.data["Time Series (Daily)"];
          const latestDate = Object.keys(dailyData)[0];
          const currentPrice = parseFloat(dailyData[latestDate]["4. close"]);

          const stockValue = currentPrice * quantity;
          total += stockValue;

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

        setStocks(updatedStocks);
        setTotalValue(total.toFixed(2));
        setTopStock(highestStock);

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
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        alert("Failed to fetch dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Dashboard</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading your portfolio...</p>
      ) : (
        <div>
          <div style={styles.infoCards}>
            <div style={styles.card}>
              <h5 style={styles.cardTitle}>Total Portfolio Value</h5>
              <p style={styles.cardText}>${totalValue}</p>
            </div>
            <div style={styles.card}>
              <h5 style={styles.cardTitle}>Top-Performing Stock</h5>
              {topStock ? (
                <p style={styles.cardText}>
                  {topStock.name} ({topStock.ticker}) - $
                  {topStock.currentPrice.toFixed(2)}
                </p>
              ) : (
                <p style={styles.cardText}>No data available</p>
              )}
            </div>
          </div>

          <div style={styles.chartSection}>
            <h2 style={styles.subHeading}>Portfolio Distribution</h2>
            {chartData ? (
              <Pie data={chartData} />
            ) : (
              <p style={styles.loadingText}>No distribution data available.</p>
            )}
          </div>

          <div style={styles.imageSection}>
            <img
              src="https://via.placeholder.com/800x400"
              alt="Stocks overview"
              style={styles.image}
            />
            <p style={styles.description}>
              Visualize your portfolio and stay informed with real-time
              updates. Use data-driven insights to make smarter investment
              decisions!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  loadingText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
  infoCards: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "40%",
  },
  cardTitle: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "16px",
    color: "#555",
  },
  chartSection: {
    marginBottom: "30px",
  },
  subHeading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "15px",
  },
  imageSection: {
    textAlign: "center",
    marginTop: "30px",
  },
  image: {
    width: "100%",
    maxHeight: "400px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
  },
};

export default Dashboard;
