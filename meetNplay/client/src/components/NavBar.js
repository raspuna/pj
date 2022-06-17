import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-2">
      <Navbar.Brand href="/home" className="ms-4 MyTitle">
        MeetNPlay
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link variant="transparent" href="/about">
            About
          </Nav.Link>
          <Nav.Link variant="transparent" href="/playdates">
            Playdate
          </Nav.Link>
          <Nav.Link variant="transparent" href="/friends">
            Friend
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
