import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";
import "./index.css";

export default function Home() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    exibirRelatorio();
    //console.log(`Teste`)
  }, []);

  async function exibirRelatorio() {
    const response = await api.get("/dash/home");
    console.log("users", response.data);
    setRelatorio(response.data);
  }

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
                <CardTitle className="dash-home-title">
                  Podcasts Cadastrados
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_podcast}</h1>
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
                <CardTitle className="dash-home-title">
                  Usuários Cadastrados
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_usuario}</h1>
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
                <CardTitle className="dash-home-title">
                  Podcasters Cadastrados
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_podcaster}</h1>
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
                <CardTitle className="dash-home-title">
                  Podcasters Premium
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_premium}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-5">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Moderadores do Sistema
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_moderador}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-5">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Categorias Cadastradas
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_categoria}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-5">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Comentarios Publicados
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_comentario}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3 mt-5">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Publicidades Publicadas
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">{relatorio.qtd_publicidade}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
