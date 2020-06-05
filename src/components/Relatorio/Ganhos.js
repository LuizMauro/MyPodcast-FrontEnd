import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export default function Ganhos({ relatorio }) {
  return (
    <>
      <Col lg="12 mt-3">
        <Card className="bg-secondary shadow border-0 relatorio-info-double">
          <CardBody
            style={{ justifyContent: "center" }}
            enctype="multipart/form-data"
          >
            <CardTitle className="dash-home-title">Ganho total</CardTitle>
            <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
              <Col lg="6" className="center grid">
                <span className="group-info-3 white">
                  Com assinantes mensais:{" "}
                  <span className="green">
                    {" "}
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_total_mensal)}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Com assinantes anuais:{" "}
                  <span className="green">
                    {" "}
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_total_anual)}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(relatorio.ass_valor_total_total)}
                </span>
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
                  Com assinantes mensais:{" "}
                  <span className="green">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_mensal_mensal)}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Com assinantes anuais:{" "}
                  <span className="green">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_mensal_anual)}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(relatorio.ass_valor_mensal_total)}
                </span>
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
                  Com assinantes mensais:{" "}
                  <span className="green">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_anual_mensal)}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Com assinantes anuais:{" "}
                  <span className="green">
                    {Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(relatorio.ass_valor_anual_anual)}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(relatorio.ass_valor_anual_total)}
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
