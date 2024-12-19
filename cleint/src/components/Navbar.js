import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';

const AppNavbar = () => {
  const navigate = useNavigate();
  const userId = Cookies.get('userId');

  const handleLogout = () => {
    Cookies.remove('userId'); // Clear the cookie
    alert('Logged out successfully');
    navigate('/'); // Redirect to home
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Portfolio Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/mystocks">My Stocks</Nav.Link>
            {!userId ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
