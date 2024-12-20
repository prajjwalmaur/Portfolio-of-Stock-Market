# Portfolio Tracker

This project is a **Portfolio Tracker** application that helps users manage their stock portfolios effectively. It features a **React.js frontend** and a **Spring Boot backend**, with a **MySQL database** for data storage. Users can track stocks, visualize their portfolio, and access real-time stock price updates using the Alpha Vantage API.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Project](#running-the-project)
7. [Important Notes](#important-notes)

---

## Project Structure

```
Project/
│
├── Backend/          # Spring Boot backend
│   ├── src/main/     # Application source files
│   ├── src/test/     # Unit tests
│   ├── pom.xml       # Maven dependencies
│   └── application.properties # Backend configuration
│
├── client/           # React.js frontend
│   ├── src/          # React application source files
│   ├── public/       # Public assets for the frontend
│   └── package.json  # React.js dependencies
│
├── README.md         # Project documentation
└── .gitignore        # Files to ignore in Git
```

---

## Features

- **User Authentication**: Secure login and signup.
- **Portfolio Management**: View and manage your stock portfolio.
- **Real-Time Stock Updates**: Integration with Alpha Vantage API for live stock prices.
- **Interactive Charts**: Visualize portfolio distribution using charts.
- **Responsive Design**: Modern and user-friendly interface.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Java Development Kit (JDK)**: Version 11 or higher.
- **Maven**: To manage backend dependencies.
- **Node.js**: Version 14.x or higher.
- **npm**: Comes bundled with Node.js.
- **MySQL**: For the database.
- **Git**: To clone the repository.

---

## Backend Setup

1. **Navigate to the Backend Folder**:
   Open a terminal and navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```

2. **Configure the Database**:
   - Create a MySQL database named `stock`:
     ```sql
     CREATE DATABASE stock;
     ```
   - Update `application.properties` in the `src/main/resources` folder with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/stock
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     ```

3. **Build and Run the Backend**:
   - Compile the project using Maven:
     ```bash
     mvn clean install
     ```
   - Run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```
   The backend will be available at **http://localhost:8080**.

4. **Set Up the API Endpoints**:
   - Ensure your backend has routes for:
     - `/api/login`
     - `/api/signup`
     - `/api/stocks` (GET, POST, PATCH, DELETE)
     - `/api/stocks/{ticker}` (GET)

---

## Frontend Setup

1. **Navigate to the Client Folder**:
   Open a terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. **Install Dependencies**:
   Install the required dependencies for the React application:
   ```bash
   npm install
   ```

3. **Configure the Frontend**:
   - Open a configuration file (`src/config.js` or create one) and ensure the backend API URL is correctly set:
     ```javascript
     export const API_URL = 'http://localhost:8080/api';
     ```

4. **Run the Frontend**:
   Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on **http://localhost:3000**.

---

## Running the Project

1. **Start the Backend**:
   Open a terminal, navigate to the `Backend` folder, and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

2. **Start the Frontend**:
   Open another terminal, navigate to the `client` folder, and start the React application:
   ```bash
   npm start
   ```

3. **Access the Application**:
   Open a browser and navigate to **http://localhost:3000** to use the application.

---

## Important Notes

- **Database Initialization**:
  Use the following SQL scripts to create necessary tables:
  ```sql
  CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
  );

  CREATE TABLE stocks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      ticker VARCHAR(10) NOT NULL,
      quantity INT NOT NULL,
      buy_price DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
  );
  ```

- **Alpha Vantage API Key**:
  - Sign up at [Alpha Vantage](https://www.alphavantage.co/) to get a free API key.
  - Update your backend code to use the API key for fetching stock data.

- **Cross-Origin Requests (CORS)**:
  - Enable CORS in your backend by adding the following configuration in Spring Boot:
    ```java
    @Configuration
    public class CorsConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                            .allowedOrigins("http://localhost:3000")
                            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE");
                }
            };
        }
    }
    ```

- **Testing**:
  - Use Postman or any API testing tool to test backend endpoints.
  - Verify frontend integration by performing actions like signup, login, and stock management.

---

This README file serves as a comprehensive guide to setting up and running your **Portfolio Tracker** project.
```
