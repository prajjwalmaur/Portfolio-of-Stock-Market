import React from "react";

const Home = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <header
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <h1>Welcome to Stock Portfolio Tracker</h1>
        <p>Your gateway to smarter investments</p>
      </header>

      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            maxWidth: "300px",
            textAlign: "center",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fff",
            margin: "10px",
          }}
        >
          <img
            src="https://imageio.forbes.com/specials-images/imageserve/60a154235cd05058f9840878/stock-tracking-apps/960x0.jpg?format=jpg&width=960"
            alt="Track Your Stocks"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <h3>Track Your Stocks</h3>
          <p>
            Stay updated with real-time stock prices and performance metrics
            customized for you.
          </p>
        </div>

        <div
          style={{
            maxWidth: "300px",
            textAlign: "center",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fff",
            margin: "10px",
          }}
        >
          <img
            src="https://gravityinvestments.com/wp-content/uploads/2024/06/Image-2.webp"
            alt="Analyze Your Portfolio"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <h3>Analyze Your Portfolio</h3>
          <p>
            Visualize your portfolio distribution and find the top-performing
            stocks to maximize returns.
          </p>
        </div>

        <div
          style={{
            maxWidth: "300px",
            textAlign: "center",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#fff",
            margin: "10px",
          }}
        >
          <img
            src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/656a4e18cb8650001c4495d2.jpg"
            alt="Make Smarter Decisions"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
          <h3>Make Smarter Decisions</h3>
          <p>
            Use our analytics and insights to identify market trends and take
            smarter investment actions.
          </p>
        </div>
      </section>

      <footer
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#007bff",
          color: "white",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <p>Start tracking your investments today and take control of your financial future!</p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "white",
            color: "#007bff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => (window.location.href = "/signup")}
        >
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default Home;
