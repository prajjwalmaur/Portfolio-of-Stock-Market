import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // For navigation

const MyStocks = () => {
  const [stocks, setStocks] = useState([]); // To store stock data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Navigation hook
  const ALPHA_VANTAGE_API_KEY = "ETRYTBBGD78CKW4H"; // Replace with your API key

  useEffect(() => {
    const fetchStocks = async () => {
      const userId = Cookies.get("userId"); // Extract userId from cookies

      // If userId is null, redirect to login page
      if (!userId) {
        alert("You are not logged in. Redirecting to login page.");
        navigate("/login");
        return;
      }

      try {
        // Step 1: Fetch stock details from the backend
        const response = await axios.get(
          `http://localhost:8080/api/stocks?userId=${userId}`
        );
        const stockData = response.data; // Array of stock objects: [{name, ticker, quantity, buy_price, last_updated}, ...]

        // Step 2: Fetch real-time stock prices from Alpha Vantage for each stock
        const stockPricePromises = stockData.map(async (stock) => {
          try {
            const apiResponse = await axios.get(
              `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`
            );
            const timeSeries = apiResponse.data["Time Series (Daily)"];
            const latestDate = Object.keys(timeSeries)[0]; // Get the latest available date
            const currentPrice = timeSeries[latestDate]["4. close"]; // Fetch the closing price for that date

            return {
              ...stock,
              currentPrice: parseFloat(currentPrice).toFixed(2), // Add current stock price
              latestDate, // Add last updated date from Alpha Vantage
            };
          } catch (error) {
            console.error(`Error fetching price for ${stock.ticker}:`, error);
            return {
              ...stock,
              currentPrice: "N/A", // Default value if API fails
              latestDate: "N/A",
            };
          }
        });

        // Resolve all promises and update the state
        const resolvedStockData = await Promise.all(stockPricePromises);
        setStocks(resolvedStockData);
      } catch (error) {
        console.error("Error fetching stocks from backend:", error);
        alert("Failed to fetch stock data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchStocks(); // Fetch stocks when the component loads
  }, [navigate]);

  const handleDelete = (ticker) => {
    const userId = Cookies.get("userId");
    if (window.confirm("Are you sure you want to delete this stock?")) {
      fetch(`http://localhost:8080/api/stocks/${ticker}?userId=${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setStocks(stocks.filter((stock) => stock.ticker !== ticker));
          } else {
            console.error("Failed to delete stock");
          }
        })
        .catch((error) => console.error("Error deleting stock:", error));
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Stocks</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/form")}
      >
        Add New Stock
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Stock Name</th>
              <th>Ticker</th>
              <th>Quantity</th>
              <th>Buy Price</th>
              <th>Current Price</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td colSpan="6">No stocks found in your portfolio.</td>
              </tr>
            ) : (
              stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.ticker}</td>
                  <td>{stock.quantity}</td>
                  <td>${parseFloat(stock.buyPrice).toFixed(2)}</td>
                  <td>${stock.currentPrice}</td>
                  <td>{stock.latestDate}</td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => navigate(`/form?ticker=${stock.ticker}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning me-2" onClick={() => handleDelete(stock.ticker)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyStocks;
