import React from "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";

export default function Outros({ relatorio, grafico }) {
  // const totalJaneiro = grafico.Janeiro[grafico.Janeiro.length - 1].valor_total;
  return (
    <>
      {console.log(
        "teste de dados",
        grafico.Janeiro[grafico.Janeiro.length - 1].valor_total
      )}
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
              <span className="relatorio-span white">
                {relatorio.qtd_categoria}
              </span>
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
              <span className="relatorio-span white">
                {relatorio.qtd_comentario}
              </span>
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
              <span className="relatorio-span white">
                {relatorio.qtd_publicidade}
              </span>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
