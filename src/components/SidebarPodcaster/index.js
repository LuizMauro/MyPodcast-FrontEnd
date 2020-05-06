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
  FaAngleRight,
} from "react-icons/fa";
import { GoMegaphone } from "react-icons/go";

import "./styles.css";

const mql = window.matchMedia(`(min-width: 900px)`);

class SidebarPod extends Component {
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
                <Navitem
                  item="Podcasts"
                  tolink="/podcaster/dashboard/podcasts"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaMicrophone
                      style={{ width: 25, height: 25 }}
                    ></FaMicrophone>
                  }
                />

                <Navitem
                  item="Assinar Premium"
                  tolink="/podcaster/dashboard/assinar"
                  activec={this.activeitem}
                  style={{ width: "100%" }}
                  icone={
                    <FaListUl style={{ width: 25, height: 25 }}></FaListUl>
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
              <div>
                <button
                  style={{ background: "none", border: 0 }}
                  onClick={() => this.onSetSidebarOpen()}
                >
                  <FaAngleRight size={50} color="#1bfdbe"></FaAngleRight>
                </button>
              </div>
            ) : (
              <div>
                <button
                  style={{ background: "none", border: 0 }}
                  onClick={() => this.onSetSidebarExit()}
                >
                  <FaAngleLeft size={50} color="#1bfdbe"></FaAngleLeft>
                </button>
              </div>
            )}
          </div>

          <div style={{ marginTop: 20 }}>{this.props.teste}</div>
        </Sidebar>
      </>
    );
  }
}

export default SidebarPod;
