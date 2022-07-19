import React from 'react';
import { Container, Navbar,Nav } from 'react-bootstrap';
import '../App.css';

const NavbarContainer =() =>{
    return(
        <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand href="#home">Studpro 5.0</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">About Us</Nav.Link>
          <Nav.Link href="#features">past events</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    )
}

export default NavbarContainer