import React from "react";

import Notifications from "../Notifications";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { updateToPodcasterRequest } from "../../store/modules/user/actions";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/modules/auth/actions";
import "../../styles/global";
import "./styles.css";

// reactstrap components
import {
  UncontrolledCollapse,
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
          <NavbarBrand href="/" style={{ cursor: "pointer" }}>
            <img
              style={{ width: 50, height: 50, cursor: "pointer" }}
              alt="..."
              src={require("../../assets/img/brand/Ativo 13@4x.png")}
            />
          </NavbarBrand>
          <Col>
            <h1 className="logo-title mb-0">MyPodcast</h1>
          </Col>
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
                <NavLink className="nav-link-icon home-button" href="/">
                  <i className="ni ni-favourite-28" /> Home
                </NavLink>
              </NavItem>

              <NavItem>
                {profile ? (
                  profile.tus_descricao === "Administrador" ? (
                    <>
                      <NavLink className="nav-link-icon  icone-li home-button">
                        <Link to="/adm/dashboard">
                          <i className="ni ni-favourite-28" /> Painel
                        </Link>
                      </NavLink>
                    </>
                  ) : profile.tus_descricao === "Moderador" ? (
                    <NavLink className="nav-link-icon icone-li home-button">
                      <Link to="/mod/dashboard">
                        <i className="ni ni-favourite-28" /> Painel
                      </Link>
                    </NavLink>
                  ) : profile.tus_descricao === "Podcaster" ? (
                    <NavLink className="nav-link-icon icone-li home-button">
                      <Link to="/podcaster/dashboard/podcasts">
                        <i className="ni ni-favourite-28" /> Painel
                      </Link>
                    </NavLink>
                  ) : (
                    <NavLink className="nav-link-icon icone-li home-button">
                      <i className="ni ni-favourite-28" />{" "}
                      <a onClick={(e) => virarPodcaster(profile)}>
                        Tenho um Podcast
                      </a>
                    </NavLink>
                  )
                ) : (
                  <NavLink className="nav-link-icon icone-li home-button">
                    <Link to="/Login">
                      <i className="ni ni-favourite-28" /> Entrar
                    </Link>
                  </NavLink>
                )}
              </NavItem>

              <NavItem>
                {profile ? (
                  <>
                    <NavLink className="nav-link-icon icone-li home-button">
                      <Link to="/Profile">
                        <FaUserCircle
                          color={"#FFF"}
                          size={25}
                          className="navbar-icon"
                        />
                      </Link>
                    </NavLink>
                  </>
                ) : (
                  <NavLink className="nav-link-icon icone-li home-button">
                    <Link to="/Cadastro">
                      <i className="ni ni-favourite-28" /> Cadastrar-se
                    </Link>
                  </NavLink>
                )}
              </NavItem>

              {profile && (
                <NavItem>
                  <NavLink>
                    <Notifications />
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                {profile && (
                  <NavLink className="nav-link-icon home-button">
                    <FaSignOutAlt
                      color={"#FFF"}
                      size={24}
                      onClick={handleSignOut}
                      className="navbar-icon"
                    />
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
      {/* Navbar primary */}
    </>
  );
}
