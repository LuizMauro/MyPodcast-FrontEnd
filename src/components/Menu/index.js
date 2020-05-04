import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { updateToPodcasterRequest } from "../../store/modules/user/actions";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/modules/auth/actions";

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

export default function Index() {
  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  async function virarPodcaster(profile) {
    dispatch(updateToPodcasterRequest());
  }

  //console.log('perfil é', profile.tus_id);

  return (
    <>
      {/* Navbar default */}
      <Navbar className="navbar-dark bg-default" expand="lg">
        <Container>
          <NavbarBrand href="/">
            <img
              style={{ width: 50, height: 50 }}
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
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="ni ni-favourite-28" /> Home
                </NavLink>
              </NavItem>

              <NavItem>
                {profile ? (
                  profile.tus_descricao === "Administrador" ? (
                    <NavLink className="nav-link-icon" href="/adm/dashboard">
                      <i className="ni ni-favourite-28" /> Painel
                    </NavLink>
                  ) : profile.tus_descricao === "Moderador" ? (
                    <NavLink className="nav-link-icon" href="/mod/dashboard/">
                      <i className="ni ni-favourite-28" /> Painel
                    </NavLink>
                  ) : profile.tus_descricao === "Podcaster" ? (
                    <NavLink
                      className="nav-link-icon"
                      href="/podcaster/dashboard"
                    >
                      <i className="ni ni-favourite-28" /> Painel
                    </NavLink>
                  ) : (
                    <NavLink className="nav-link-icon" href="#">
                      <i className="ni ni-favourite-28" />{" "}
                      <a onClick={(e) => virarPodcaster(profile)}>
                        Tenho um Podcast
                      </a>
                    </NavLink>
                  )
                ) : (
                  <NavLink className="nav-link-icon" href="/login">
                    <i className="ni ni-favourite-28" /> Entrar
                  </NavLink>
                )}
              </NavItem>

              <NavItem>
                {profile ? (
                  <NavLink className="nav-link-icon" href="/profile">
                    <FaUserCircle color={"#FFF"} size={24} />
                  </NavLink>
                ) : (
                  <NavLink className="nav-link-icon" href="/cadastro">
                    <i className="ni ni-favourite-28" /> Cadastrar-se
                  </NavLink>
                )}
              </NavItem>

              <NavItem>
                {profile && (
                  <NavLink className="nav-link-icon" href="#">
                    <FaSignOutAlt
                      color={"#FFF"}
                      size={24}
                      onClick={handleSignOut}
                    />
                  </NavLink>
                )}
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className="nav-link-icon">
                  <i className="ni ni-settings-gear-65" />
                  <span className="nav-link-inner--text d-lg-none">
                    Settings
                  </span>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbar-default_dropdown_1" right>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Action
                  </DropdownItem>
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Another action
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
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
  );
}
