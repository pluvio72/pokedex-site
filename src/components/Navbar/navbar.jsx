import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="danger" expand="lg" className="h-100">
      <Container>
        <Navbar.Toggle aria-controls="navbar-general" />
        <Navbar.Collapse id="navbar-general">
          <Navbar.Brand>
              <img src="/images/logo.png" alt="pokemon logo" height="55"/>
          </Navbar.Brand>
          <Nav className="me-auto align-items-center">
            <NavLink to="/" className="nav-link fw-bold fs-5">HOME</NavLink>
            <NavLink to="/compare" className="nav-link fw-bold fs-5">COMPARE</NavLink>
            <NavLink to="/favourites" className="nav-link fw-bold fs-5">FAV</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;