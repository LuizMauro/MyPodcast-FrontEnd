import React from "react";
import Menu from '../../components/Menu'

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import "./index.css";

export default function Mapa() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <>
    <Menu/>
    <section className="section section-shaped section-lg">
      <Container>
        <Row style={{ justifyContent: "center" }}>
          <Col lg="3 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Acesso</CardTitle>

                {profile ? (
                  profile.tus_descricao === "Administrador" ? (
                    <>
                      <Link
                        to="/"
                        className="d-flex mt-2 "
                        style={{ justifyContent: "center" }}
                      >
                        Home
                      </Link>
                      <Link
                        to="/adm/dashboard/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Painel
                      </Link>
                      <Link
                        to="/profile"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Perfil
                      </Link>
                    </>
                  ) : profile.tus_descricao === "Moderador" ? (
                    <>
                      <Link
                        to="/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Home
                      </Link>
                      <Link
                        to="/mod/dashboard/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Painel
                      </Link>
                      <Link
                        to="/profile"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Perfil
                      </Link>
                    </>
                  ) : profile.tus_descricao === "Podcaster" ? (
                    <>
                      <Link
                        to="/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Home
                      </Link>
                      <Link
                        to="/podcaster/dashboard/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Painel
                      </Link>
                      <Link
                        to="/profile"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Perfil
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Home
                      </Link>
                      <Link
                        to="/profile"
                        className="d-flex mt-2"
                        style={{ justifyContent: "center" }}
                      >
                        Perfil
                      </Link>
                    </>
                  )
                ) : (
                  <>
                    <Link
                      to="/Login"
                      className="d-flex mt-2"
                      style={{ justifyContent: "center" }}
                    >
                      Entrar
                    </Link>
                    <Link
                      to="/Cadastro"
                      className="d-flex mt-2"
                      style={{ justifyContent: "center" }}
                    >
                      Cadastrar
                    </Link>
                    <Link
                      to="/"
                      className="d-flex mt-2"
                      style={{ justifyContent: "center" }}
                    >
                      Pagina Inicial
                    </Link>
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
                <CardTitle className="dash-home-title">
                  Termo de uso
                </CardTitle>
                <Link
                  className="d-flex mt-2"
                  style={{ justifyContent: "center" }}
                >
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
                <CardTitle className="dash-home-title">
                  Mapa do site
                </CardTitle>
                <Link
                  to="/Sitemap"
                  className="d-flex mt-2 "
                  style={{ justifyContent: "center" }}
                >
                  Estrutura
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}
