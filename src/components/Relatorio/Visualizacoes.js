import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export default function Visualizacoes({relatorio}) {
  return (
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
  );
}
