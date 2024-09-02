import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Lista de Temtems</Navbar.Brand>
      <Nav className="mr-auto">
        {token ? (
          <>
            <Nav.Link as={Link} to="/">Listagem de Temtems</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Cadastro</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;
