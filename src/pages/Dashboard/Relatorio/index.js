import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Card, CardBody, Container, Row, Col, CardTitle } from "reactstrap";
import "./index.css";

export default function Relatorio() {
  const [relatorio, setRelatorio] = useState([]);

  useEffect(() => {
    exibirRelatorio();
    //console.log(`Teste`)
  }, []);

  async function exibirRelatorio() {
    const response = await api.get("/relatorio");
    console.log("users", response.data);
    setRelatorio(response.data);
  }

  return (
    <section className="section section-shaped section-lg">
      <Container>
        <Row style={{ justifyContent: "center" }} className="bg-secondary pb-3">
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
                  <h1 className="dash-home-value">
                    {relatorio.qtd_comentario}
                  </h1>
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
                  <h1 className="dash-home-value">
                    {relatorio.qtd_publicidade}
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="bg-secondary">
          <Col lg="12">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                className="px-lg-5 py-lg-5"
                enctype="multipart/form-data"
              >
                <Row>
                  <Col sm="12" md="12" className="mb-3">
                    <h4 className="ass-title title">
                      Visualizações Totais no sistema:{" "}
                      <span className="ass-text">{relatorio.totalview}</span>
                    </h4>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      Na última semana:{" "}
                      <span className="ass-text">{relatorio.viewweek}</span>
                    </h6>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      No último mês:{" "}
                      <span className="ass-text">{relatorio.viewmonth}</span>
                    </h6>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h4 className="ass-title title">
                      Total de Assinantes Premium:{" "}
                      <span className="ass-text">{relatorio.ass_total}</span>
                    </h4>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      Assinantes do Plano Mensal:{" "}
                      <span className="ass-text">{relatorio.ass_mensal}</span>
                    </h6>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      Assinantes do Plano Anual:{" "}
                      <span className="ass-text">{relatorio.ass_anual}</span>
                    </h6>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h4 className="ass-title title">
                      Estimativa de Ganho - Total:{" "}
                      <span className="ass-text">
                        {relatorio.ass_valor_total
                          ? Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(relatorio.ass_valor_total)
                          : Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(0)}
                      </span>
                    </h4>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      Com assinaturas mensais:{" "}
                      <span className="ass-text">
                        {relatorio.ass_valor_mensal
                          ? Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(relatorio.ass_valor_mensal)
                          : Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(0)}
                      </span>
                    </h6>
                  </Col>
                  <Col sm="12" md="12" className="mb-3">
                    <h6 className="ass-title title white">
                      Com assinaturas anuais:{" "}
                      <span className="ass-text">
                        {relatorio.ass_valor_anual
                          ? Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(relatorio.ass_valor_anual)
                          : Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(0)}
                      </span>
                    </h6>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
