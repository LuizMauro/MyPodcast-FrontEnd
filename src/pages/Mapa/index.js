import React, { useState, useEffect } from "react";
//import api from "../../../services/api";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { updateToPodcasterRequest } from "../../store/modules/user/actions";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/modules/auth/actions";

import {
  Button,
  Card,
  CardBody,
  CardLink,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import "./index.css";

export default function Mapa() {
  const profile = useSelector((state) => state.user.profile);
  //const dispatch = useDispatch();
  //function handleSignOut() {
  //  dispatch(signOut());
  //}
  // async function virarPodcaster(profile) {
  //   dispatch(updateToPodcasterRequest());
  // }
  return (
    <section className="section section-shaped section-lg">
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Col lg="3 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title border">
                  Acesso
                </CardTitle>

                {profile ? (profile.tus_descricao === "Administrador" ? (
                  <>
                    <Link to="/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Link>
                    <Link to="/adm/dashboard/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Link>
                    <Link to="/profile" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Link>
                    <Link className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Link>
                  </>
                ) : profile.tus_descricao === "Moderador" ? (
                  <>
                    <Link to="/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Link>
                    <Link to="/mod/dashboard/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Link>
                    <Link to="/profile" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Link>
                    <Link className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Link>
                  </>
                ) : profile.tus_descricao === "Podcaster" ? (
                  <>
                    <Link to="/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Link>
                    <Link to="/podcaster/dashboard/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Link>
                    <Link to="/profile" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Link>
                    <Link className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Link>
                  </>
                ) : (
                        <>
                          <Link to="/" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Link>
                          <Link to="/profile" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Link>
                          <Link className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Link>
                        </>
                      ))
                  : (
                    <>
                      <Link to="/Login" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Entrar</Link>
                      <Link to="/Cadastro" className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Cadastrar</Link>
                      <Link to="/" className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Pagina Inicial</Link>
                    </>
                  )}


              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title border">
                  Termo de uso
                </CardTitle>
                <Link className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>
                  Regras
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title border">
                  Mapa do site
                </CardTitle>
                <Link to="/Sitemap" className="d-flex mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>
                  Estrutura
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
