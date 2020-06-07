import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Chart from "react-google-charts";

export default function Ganhos({ relatorio, grafico }) {
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
      {grafico.Janeiro && (
        <Col lg="12" className="mt-1 pt-3" style={{ justifyContent: "center" }}>
          <Chart
            width={950}
            height={400}
            chartType="ColumnChart"
            style={{ margin: "0 auto" }}
            loader={<div>Loading Chart</div>}
            data={[
              ["Meses do Ano", "Ganhos por Mês"],
              ["Jan", grafico.Janeiro[grafico.Janeiro.length - 1].valor_total],
              [
                "Fev",
                grafico.Fevereiro[grafico.Fevereiro.length - 1].valor_total,
              ],
              ["Mar", grafico.Marco[grafico.Marco.length - 1].valor_total],
              ["Abr", grafico.Abril[grafico.Abril.length - 1].valor_total],
              ["Mai", grafico.Maio[grafico.Maio.length - 1].valor_total],
              ["Jun", grafico.Junho[grafico.Junho.length - 1].valor_total],
            ]}
            options={{
              title: "Ganhos nos últimos meses",
              fontColor: "#FFF",
              backgroundColor: "#151734",
              legendTextStyle: { color: "#FFF" },
              titleTextStyle: { color: "#FFF" },
              colors: ["rgb(27, 253, 190)", "#232659"],
              chartArea: { width: "30%" },
              hAxis: {
                title: "Meses do Ano",
                minValue: 0,
                color: "#FFF",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF" },
              },
              vAxis: {
                title: "Assinaturas",
                color: "#FFF",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF" },
              },
            }}
            legendToggle
          />
        </Col>
      )}
    </>
  );
}
