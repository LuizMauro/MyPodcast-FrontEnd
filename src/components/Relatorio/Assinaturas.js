import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Chart from "react-google-charts";

export default function Assinaturas({ relatorio, grafico }) {
  return (
    <>
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
                  Assinantes do Plano Mensal:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_total_mensal}{" "}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Assinantes do Plano Anual:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_total_anual}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {relatorio.ass_qtd_total_total}
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
              Assinaturas Premium do último mês
            </CardTitle>
            <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
              <Col lg="6" className="center grid">
                <span className="group-info-3 white">
                  Plano Mensal:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_mensal_mensal}{" "}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Plano Anual:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_mensal_anual}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {relatorio.ass_qtd_mensal_total}
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
              Assinaturas Premium do último ano
            </CardTitle>
            <Row className="mt-1 pt-0" style={{ justifyContent: "center" }}>
              <Col lg="6" className="center grid">
                <span className="group-info-3 white">
                  Plano Mensal:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_anual_mensal}{" "}
                  </span>
                </span>
                <span className="group-info-3 white">
                  Plano Anual:{" "}
                  <span className="green">
                    {" "}
                    {relatorio.ass_qtd_anual_anual}{" "}
                  </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {relatorio.ass_qtd_anual_total}
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
            loader={<div>Loading Chart</div>}
            data={[
              ["Meses do Ano", "Quantidade de Assinaturas"],
              ["Jan", grafico.Janeiro.length - 1],
              ["Fev", grafico.Fevereiro.length - 1],
              ["Mar", grafico.Marco.length - 1],
              ["Abr", grafico.Abril.length - 1],
              ["Mai", grafico.Maio.length - 1],
              ["Jun", grafico.Junho.length - 1],
            ]}
            options={{
              title: "Assinaturas Premium nos últimos meses",
              fontColor: "#FFF",
              backgroundColor: "#151734",
              legendTextStyle: { color: "#FFF" },
              titleTextStyle: { color: "#FFF" },
              colors: ["rgb(27, 253, 190)", "#232659"],
              chartArea: { width: "30%" },
              hAxis: {
                color: "#FFF",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF"},
                title: "Meses do Ano",
                minValue: 0,
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
