import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class NavigationBar extends React.Component {

  render() {
    return (
          <div className="NavBar">
            <Navbar fixed="top" bg="light" expand="lg">
              <Navbar.Brand href="/">
              <img
              alt=""
              src={require("../Landing/assets/favicon.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Hacker Matcher
              </Navbar.Brand>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="ml-auto">
                
                <NavDropdown title="usernameHere">
                  <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item hrerf="#Cteam">Create Team</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#AMember">Add Member To My Team</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/">Log out</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/chat">
                  <img
                  alt=""
                  src={require("../Landing/assets/chatImage.png")}
                  width="40"
                  height="30"
                  className="d-inline-block align-top"
                />
                Messages
                </Nav.Link>
                
                {/*
                    <Nav.Link href="#Account">My Account</Nav.Link>
                    <Nav.Link href="#Cteam">Create Team</Nav.Link>
                    <Nav.Link href="#AMember">Add Member To My Team</Nav.Link>
                    <Button variant="danger">Logout</Button>
                */}
                </Nav>
                
              </Navbar.Collapse>
            </Navbar>
          </div>
    );
  }
}

export default NavigationBar;