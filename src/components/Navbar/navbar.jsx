import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="danger" expand="lg" className="h-100">
      <Container>
        <Navbar.Toggle aria-controls="navbar-general" />
        <Navbar.Collapse id="navbar-general">
          <Nav className="mx-auto align-items-center">
            <NavLink to="/" className="nav-link fw-bold fs-4">INDEX</NavLink>
            <Navbar.Brand className="mx-3" href="#home">
                <img src="/images/logo.png" alt="pokemon logo" height="55"/>
            </Navbar.Brand>
            <NavLink to="/compare" className="nav-link fw-bold fs-4">COMPARE</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;