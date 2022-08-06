import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavbarComponent() {
  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="navbar-general" />
        <Navbar.Collapse id="navbar-general">
          <Nav className="mx-auto align-items-center">
            <Nav.Link href="#home">Home</Nav.Link>
            <Navbar.Brand className="mx-3" href="#home">
                <img src="/images/logo.png" alt="pokemon logo" height="55"/>
            </Navbar.Brand>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;