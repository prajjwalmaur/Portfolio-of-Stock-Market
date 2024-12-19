import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

const Form = () => {
  const [searchParams] = useSearchParams();
  const ticker = searchParams.get("ticker"); // Extract ticker from query params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  });

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    // If editing, fetch stock data and populate form fields
    if (ticker) {
      axios
        .get(`http://localhost:8080/api/stocks/${ticker}?userId=${userId}`)
        .then((response) => {
          setFormData(response.data); // Prefill form fields with stock data
        })
        .catch((error) => {
          console.error("Error fetching stock data:", error);
          alert("Failed to fetch stock details.");
          navigate("/mystocks");
        });
    }
  }, [ticker, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Cookies.get("userId");
    if (!userId) {
      alert("You are not logged in. Redirecting to login page.");
      navigate("/login");
      return;
    }

    try {
      if (ticker) {
        // Edit stock: PATCH request
        const response = await fetch(
          `http://localhost:8080/api/stocks?userId=${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
          ...formData,
              lastUpdated: new Date().toISOString(),
            }),
          }
        );

        alert("Stock updated successfully!");
      } else {
        // Add new stock: POST request
        await axios.post(`http://localhost:8080/api/stocks`, {
          userId,
          ...formData,
        });
        alert("Stock added successfully!");
      }
      navigate("/mystocks"); // Redirect to MyStocks page
    } catch (error) {
      console.error("Error saving stock:", error);
      alert("Failed to save stock. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{ticker ? "Edit Stock" : "Add New Stock"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Stock Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ticker</label>
          <input
            type="text"
            className="form-control"
            name="ticker"
            value={formData.ticker}
            onChange={handleInputChange}
            required
            disabled={!!ticker} // Disable editing ticker when editing a stock
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Buy Price</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {ticker ? "Update Stock" : "Add Stock"}
        </button>
      </form>
    </div>
  );
};

export default Form;
