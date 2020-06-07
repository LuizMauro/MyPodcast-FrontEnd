import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import Chart from "react-google-charts";

export default function Visualizacoes({ relatorio, graphview }) {
  return (
    <>
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
                  Na última semana:{" "}
                  <span className="green"> {relatorio.viewweek} </span>
                </span>
                <span className="group-info-3 white">
                  No último mês:{" "}
                  <span className="green"> {relatorio.viewmonth} </span>
                </span>
              </Col>
              <Col lg="6" className="center pt-4">
                <span className="relatorio-span white">
                  {relatorio.totalview}
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      {graphview.Janeiro && (
        <Col lg="12" className="mt-1 pt-3" style={{ justifyContent: "center" }}>
          <Chart
            width={950}
            height={400}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={[
              ["Meses do Ano", "Visualizações no Sistema"],
              ["Jan", graphview.Janeiro.length],
              ["Fev", graphview.Fevereiro.length],
              ["Mar", graphview.Marco.length],
              ["Abr", graphview.Abril.length],
              ["Mai", graphview.Maio.length],
              ["Jun", graphview.Junho.length],
            ]}
            options={{
              title: "Visualizações do sistema nos últimos meses",
              fontColor: "#FFF",
              backgroundColor: "#151734",
              legendTextStyle: { color: "#FFF" },
              titleTextStyle: { color: "#FFF" },
              colors: ["rgb(27, 253, 190)", "#232659"],
              chartArea: { width: "30%" },
              hAxis: {
                color: "#FFF",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF" },
                title: "Meses do Ano",
                minValue: 0,
              },
              vAxis: {
                title: "Visualizações",
                color: "#FFF",
                legendTextStyle: { color: "#FFF" },
                titleTextStyle: { color: "#FFF" },
                minValue: 0,
              },
            }}
            legendToggle
          />
        </Col>
      )}
    </>
  );
}
