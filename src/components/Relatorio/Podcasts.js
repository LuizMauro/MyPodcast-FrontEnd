import React from 'react';
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
// import { Container } from './styles';

export default function Relatorio({relatorio}) {
  return (
      <>
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
  </>
  );
}

