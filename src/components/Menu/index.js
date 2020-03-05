import React from 'react'

import { Link } from 'react-router-dom';
// reactstrap components
import {
    UncontrolledCollapse,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
  } from "reactstrap";

export default function index() {
    return (
        <>
                {/* Navbar default */}
                <Navbar className="navbar-dark bg-default" expand="lg">
                <Container>
                  <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                  <img
                    style={{width:50, height:50 }}
                     alt="..."
                      src={require("../../assets/img/brand/Ativo 13@4x.png")}
                    />
                  </NavbarBrand>
                  <button className="navbar-toggler" id="navbar-default">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <UncontrolledCollapse navbar toggler="#navbar-default">
                    <div className="navbar-collapse-header">
                      <Row>
                        <Col className="collapse-brand" xs="6">
                          <Link to="/">
                            <img
                              alt="..."
                              src={require("../../assets/img/brand/Ativo 13@4x.png")}
                            />
                          </Link>
                        </Col>
                        <Col className="collapse-close" xs="6">
                          <button className="navbar-toggler" id="navbar-default">
                            <span />
                            <span />
                          </button>
                        </Col>
                      </Row>
                    </div>
                    <Nav className="ml-lg-auto" navbar>
                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="ni ni-favourite-28" /> Home
                          <span className="nav-link-inner--text d-lg-none">
                            Discover
                          </span>
                        </NavLink>
                      </NavItem>
    
                      <NavItem>
                        <NavLink
                          className="nav-link-icon"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="ni ni-favourite-28" /> Home
                          <span className="nav-link-inner--text d-lg-none">
                            Discover
                          </span>
                        </NavLink>
                      </NavItem>
                     
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav className="nav-link-icon">
                          <i className="ni ni-settings-gear-65" />
                          <span className="nav-link-inner--text d-lg-none">
                            Settings
                          </span>
                        </DropdownToggle>
                        <DropdownMenu
                          aria-labelledby="navbar-default_dropdown_1"
                          right
                        >
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </UncontrolledCollapse>
                </Container>
              </Navbar>
              {/* Navbar primary */}
        </>
            
    )
}
