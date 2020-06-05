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
        <Row className="bg-secondary mb-0">
          <Col lg="12">
            <CardTitle style={{ fontSize: 25, color: "#fff", marginTop: 20 }}>
              Relatório do Sistema
            </CardTitle>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }} className="bg-secondary pb-3">
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Podcasts</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Usuários</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Visualização</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Assinaturas</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Ganhos</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">Outros</CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1 className="dash-home-value">ICON</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="bg-secondary mt-3">
          <Col lg="6 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Podcasts Cadastrados
                </CardTitle>
                <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
                  <span className="relatorio-span white">{relatorio.qtd_podcast}</span>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double pt-0">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title mt-0">
                  Solicitações de Cadastro
                </CardTitle>
                <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
                  <span className="relatorio-span white">{relatorio.qtd_solicitacao}</span>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Usuários cadastrados
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Moderadores do Sistema: <span className="green"> {relatorio.qtd_moderador} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Podcasters: <span className="green"> {relatorio.qtd_podcaster} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Podcasters Premium: <span className="green"> {relatorio.qtd_premium} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-5">
                    <span className="relatorio-span white">{relatorio.qtd_usuario}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Visualizações no Sistema
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Na última semana: <span className="green"> {relatorio.viewweek} </span>
                    </span>
                    <span  className="group-info-3 white">
                    No último mês: <span className="green"> {relatorio.viewmonth} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.totalview}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Total de Assinaturas Premium
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Assinantes do Plano Mensal: <span className="green"> {relatorio.ass_qtd_total_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Assinantes do Plano Anual: <span className="green"> {relatorio.ass_qtd_total_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_qtd_total_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Assinaturas Premium do último mês
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Plano Mensal: <span className="green"> {relatorio.ass_qtd_mensal_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Plano Anual: <span className="green"> {relatorio.ass_qtd_mensal_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_qtd_mensal_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Assinaturas Premium do último ano
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Plano Mensal: <span className="green"> {relatorio.ass_qtd_anual_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Plano Anual: <span className="green"> {relatorio.ass_qtd_anual_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_qtd_anual_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Ganho total
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Com assinantes mensais: <span className="green"> {relatorio.ass_valor_total_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Com assinantes anuais: <span className="green"> {relatorio.ass_valor_total_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_valor_total_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Ganho total no último mês
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Com assinantes mensais: <span className="green"> {relatorio.ass_valor_mensal_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Com assinantes anuais: <span className="green"> {relatorio.ass_valor_mensal_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_valor_mensal_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="12 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Ganho total no último ano
                </CardTitle>
                <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
                  <Col lg="6" className="center grid">
                    <span className="group-info-3 white">
                      Com assinantes mensais: <span className="green"> {relatorio.ass_valor_anual_mensal} </span>
                    </span>
                    <span  className="group-info-3 white">
                      Com assinantes anuais: <span className="green"> {relatorio.ass_valor_anual_anual} </span>
                    </span>
                  </Col>
                  <Col lg="6" className="center pt-4">
                    <span className="relatorio-span white">{relatorio.ass_valor_anual_total}</span>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Categorias Cadastradas
                </CardTitle>
                <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
                  <span className="relatorio-span white">{relatorio.qtd_categoria}</span>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Comentários Publicados
                </CardTitle>
                <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
                  <span className="relatorio-span white">{relatorio.qtd_comentario}</span>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card className="bg-secondary shadow border-0 relatorio-info-double">
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle className="dash-home-title">
                  Publicidades Cadastradas
                </CardTitle>
                <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
                  <span className="relatorio-span white">{relatorio.qtd_publicidade}</span>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
