import React, { Component } from "react";
import Navitem from "../NavItemDash/Navitem";
import Sidebar from "react-sidebar";
import {
  FaMicrophone,
  FaUserAlt,
  FaListUl,
  FaUsersCog,
  FaRegIdCard,
  FaFileContract,
  FaHashtag,
  FaHome,
  FaAngleLeft,
  FaUserCircle,
  FaSignOutAlt,
  FaFileInvoiceDollar,
  FaAngleRight,
} from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";
import { Col, Row, NavItem, NavLink, Nav, NavbarBrand } from "reactstrap";

import "./styles.css";

const mql = window.matchMedia(`(min-width: 900px)`);

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NavItemActive: "",
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      abrir: false,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen() {
    this.setState({ sidebarDocked: true, sidebarOpen: false, abrir: false });
  }

  onSetSidebarExit() {
    this.setState({ sidebarDocked: false, sidebarOpen: false, abrir: true });
  }

  mediaQueryChanged() {
    console.log(mql.matches);
    this.setState({
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      abrir: !mql.matches,
    });
  }

  activeitem = (x) => {
    if (this.state.NavItemActive.length > 0) {
      console.log(this.state.NavItemActive);
      document
        .getElementById(this.state.NavItemActive)
        .classList.remove("active");
    }

    this.setState({ NavItemActive: x }, () => {
      console.log(this.state.NavItemActive[0]);
      document.getElementById(this.state.NavItemActive).classList.add("active");
    });
  };
  render() {
    return (
      <>
        <Sidebar
          className="teste"
          sidebar={
            <nav>
              <ul>
                <li style={{ textAlign: "center" }}>
                  <NavbarBrand
                    href="/"
                    className="logo-li"
                    style={{ marginBottom: 0 }}
                  >
                    <img
                      style={{ width: 70, height: 70 }}
                      alt="..."
                      src={require("../../assets/img/brand/Ativo 13@4x.png")}
                    />
                  </NavbarBrand>
                </li>
                <Navitem
                  item="Home"
                  tolink="/adm/dashboard/"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={<FaHome style={{ width: 25, height: 25 }}></FaHome>}
                />

                <Navitem
                  item="Podcasts"
                  tolink="/adm/dashboard/podcasts"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaMicrophone
                      style={{ width: 25, height: 25 }}
                    ></FaMicrophone>
                  }
                />

                <Navitem
                  item="Categorias"
                  tolink="/adm/dashboard/categorias"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaListUl style={{ width: 25, height: 25 }}></FaListUl>
                  }
                />

                <Navitem
                  item="Usuários"
                  tolink="/adm/dashboard/usuarios"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaUserAlt style={{ width: 25, height: 25 }}></FaUserAlt>
                  }
                />

                <Navitem
                  item="Moderadores"
                  tolink="/adm/dashboard/moderadores"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaUsersCog style={{ width: 25, height: 25 }}></FaUsersCog>
                  }
                />

                <Navitem
                  item="Solicitações"
                  tolink="/adm/dashboard/solicitacoes"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaRegIdCard
                      style={{ width: 25, height: 25 }}
                    ></FaRegIdCard>
                  }
                />

                <Navitem
                  item="Publicidade"
                  tolink="/adm/dashboard/publicidade"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <GoMegaphone
                      style={{ width: 25, height: 25 }}
                    ></GoMegaphone>
                  }
                />
                <Navitem
                  item="Planos"
                  tolink="/adm/dashboard/plano"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaFileInvoiceDollar
                      style={{ width: 25, height: 25 }}
                    ></FaFileInvoiceDollar>
                  }
                />

                <Navitem
                  item="Relatório"
                  tolink="/adm/dashboard/relatorio"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaFileContract
                      style={{ width: 25, height: 25 }}
                    ></FaFileContract>
                  }
                />
              </ul>
            </nav>
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            sidebar: {
              padding: 20,
              background: "#151734",
            },
          }}
        >
          <div
            className="shadow"
            style={{
              width: "100%",
              padding: 20,
              background: "#151734",
              position: "fixed",
              zIndex: 999,
            }}
          >
            {this.state.abrir ? (
              <div style={{ display: "flex" }}>
                <NavbarBrand href="/">
                  <img
                    style={{ width: 70, height: 70 }}
                    alt="..."
                    src={require("../../assets/img/brand/Ativo 13@4x.png")}
                  />
                </NavbarBrand>
                <button
                  style={{ background: "none", border: 0 }}
                  onClick={() => this.onSetSidebarOpen()}
                >
                  <FaAngleRight size={50} color="#1bfdbe"></FaAngleRight>
                </button>
                <Col className="col-nav-fechado">
                  <Nav style={{ marginBottom: 0, justifyContent: "flex-end" }}>
                    <NavItem className="dash-li">
                      <NavLink
                        className="nav-link-icon icone-li dash-icon"
                        href="/profile"
                      >
                        <FaUserCircle
                          color={"#FFF"}
                          style={{ width: 50, height: 50 }}
                          className="navbar-icon"
                        />
                      </NavLink>

                      <NavLink className="nav-link-icon icone-li dash-icon">
                        <FaSignOutAlt
                          onClick={this.handleSignOut}
                          color={"#FFF"}
                          style={{ width: 50, height: 50, cursor: "pointer" }}
                          className="navbar-icon"
                        />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </div>
            ) : (
              <div>
                <Row>
                  <Col>
                    <button
                      style={{ background: "none", border: 0 }}
                      onClick={() => this.onSetSidebarExit()}
                    >
                      <FaAngleLeft size={50} color="#1bfdbe"></FaAngleLeft>
                    </button>
                  </Col>
                  <Col className="col-nav-aberto">
                    <Nav style={{marginBottom:0}}>
                      <NavItem className="dash-li">
                        <NavLink
                          className="nav-link-icon icone-li dash-icon"
                          href="/profile"
                        >
                          <FaUserCircle
                            color={"#FFF"}
                            style={{ width: 50, height: 50 }}
                            className="navbar-icon"
                          />
                        </NavLink>

                        <NavLink className="nav-link-icon icone-li dash-icon">
                          <FaSignOutAlt
                            onClick={this.handleSignOut}
                            color={"#FFF"}
                            style={{ width: 50, height: 50, cursor: "pointer" }}
                            className="navbar-icon"
                            onClick={this.props.signOut}
                          />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </Col>
                </Row>
              </div>
            )}
          </div>

          <div style={{ marginTop: 20 }}>{this.props.teste}</div>
        </Sidebar>
      </>
    );
  }
}

export default Navbar;
