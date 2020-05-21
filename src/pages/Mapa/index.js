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
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Row>
                  </>
                ) : profile.tus_descricao === "Moderador" ? (
                  <>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Row>
                  </>
                ) : profile.tus_descricao === "Podcaster" ? (
                  <>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Row>
                    <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Row>
                  </>
                ) : (
                        <>
                          <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Home</Row>
                          <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Painel</Row>
                          <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Perfil</Row>
                          <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Sair</Row>
                        </>
                      ))
                  : (
                    <>
                      <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Entrar</Row>
                      <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Cadastrar</Row>
                      <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>Pagina Inicial</Row>
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
                <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>
                  Regras
                </Row>
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
                <Row className="mt-2 border-top border-bottom" style={{ justifyContent: "center" }}>
                  Estrutura
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
