import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set the userId in cookies
        Cookies.set("userId", data.userId, { expires: 7 });
        navigate("/dashboard"); // Redirect to dashboard
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
      <h2 style={styles.heading}>Welcome Back!</h2>
      <p style={styles.subHeading}>
        Login to access your personalized stock portfolio and manage your investments easily.
      </p>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
      </form>
      {error && <p style={styles.errorText}>{error}</p>}

      <p style={styles.signUpPrompt}>
        Don't have an account?{" "}
        <button
          style={styles.signUpButton}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </p>

      <div style={styles.imageSection}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwpzEZfwsnAtaKvN0sTftWohSRGAAfcQXvWw&s"
          alt="Login illustration"
          style={styles.image}
        />
        <p style={styles.description}>
          Managing your investments has never been easier! Log in now to track
          your stocks, analyze your portfolio, and stay ahead in the market.
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
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loginButton: {
    padding: "10px",
    fontSize: "16px",
    color: "white",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
  signUpPrompt: {
    textAlign: "center",
    marginTop: "20px",
    color: "#555",
  },
  signUpButton: {
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

export default Login;
