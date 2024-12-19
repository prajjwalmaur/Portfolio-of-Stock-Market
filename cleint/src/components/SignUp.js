import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login"); // Redirect to login page
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Join Us Today!</h2>
      <p style={styles.subHeading}>
        Sign up to start building and managing your personalized stock
        portfolio. Stay ahead in the market with real-time analytics and
        insights.
      </p>

      <form onSubmit={handleSignup} style={styles.form}>
        <label htmlFor="username" style={styles.label}>
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.signupButton}>
          Sign Up
        </button>
      </form>
      {error && <p style={styles.errorText}>{error}</p>}

      <p style={styles.loginPrompt}>
        Already have an account?{" "}
        <button
          style={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>

      <div style={styles.imageSection}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TDfIP8kFY1PqOWHprdw_fmNhtKRfqjwWBA&s"
          alt="Signup illustration"
          style={styles.image}
        />
        <p style={styles.description}>
          Join our growing community of investors. Manage your portfolio,
          explore market trends, and make informed decisions with ease.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    textAlign: "center",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  signupButton: {
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
  loginPrompt: {
    textAlign: "center",
    marginTop: "20px",
    color: "#555",
  },
  loginButton: {
    color: "#007bff",
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
  imageSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    maxHeight: "300px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  description: {
    color: "#555",
  },
};

export default Signup;
