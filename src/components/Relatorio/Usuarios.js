import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
// import { Container } from './styles';

export default function Relatorio({relatorio}) {
  return (
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
                Moderadores do Sistema:{" "}
                <span className="green"> {relatorio.qtd_moderador} </span>
              </span>
              <span className="group-info-3 white">
                Podcasters:{" "}
                <span className="green"> {relatorio.qtd_podcaster} </span>
              </span>
              <span className="group-info-3 white">
                Podcasters Premium:{" "}
                <span className="green"> {relatorio.qtd_premium} </span>
              </span>
            </Col>
            <Col lg="6" className="center pt-5">
              <span className="relatorio-span white">
                {relatorio.qtd_usuario}
              </span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}
