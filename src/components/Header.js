import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

class Header extends React.Component {

  render() {
    return (
          <div className="NavBar">
            <Navbar fixed="top" bg="light" expand="lg">
              <Navbar.Brand href="/home" >
              <img
              alt=""
              src={require("./Landing/assets/favicon.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Hacker Matcher
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                
                <Nav.Link href="/add">
                Add to Team
                  </Nav.Link>

              <Nav.Link href="/create">
                Create Team
                  </Nav.Link>

                <NavDropdown title="usernameHere">
                  <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Log out</NavDropdown.Item>
                </NavDropdown>
                
                <Nav.Link href="/chat">
                  <img
                  alt=""
                  src={require("./Landing/assets/chatImage.png")}
                  width="40"
                  height="30"
                  className="d-inline-block align-top"
                />
                Messages
                  </Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          </div>
    );
  }
}

export default Header;