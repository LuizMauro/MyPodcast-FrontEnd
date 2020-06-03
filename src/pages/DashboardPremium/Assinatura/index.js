import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
} from "reactstrap";
import api from "../../../services/api";
import pt from "date-fns/locale/pt";

export default function Assinatura() {
  const [renovar, setRenovar] = useState(false);
  const [dados, setDados] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadAssinatura() {
      const response = await api.get("/assinatura");
      setDados(response.data);
      const datafim = response.data.ass_datafim.replace(
        /^(\d{4})-(\d{2})-(\d{2})(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/,
        "$1-$2-$3 $4:$5:$6"
      );
      console.log('data',datafim)
      setData(datafim);
    }

    /* <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Assinatura expira em:{" "}
                        <span className="ass-text">{data}</span>
                      </h4>
                    </Col>
                    */

    loadAssinatura();
  }, []);

  return (
    <>
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-1">
          <Row style={{ justifyContent: "center" }}>
            <Col lg="12">
              <Card className="bg-secondary shadow border-0">
                <CardBody
                  className="px-lg-5 py-lg-5"
                  enctype="multipart/form-data"
                >
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    <strong>Status da Assinatura</strong>
                  </CardTitle>
                  <Row>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Plano:{" "}
                        <span className="ass-text">{dados.pln_descricao}</span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Status da Assinatura:
                        <span className="ass-text">
                          {dados.ass_id ? ` Ativa` : ` Expirada`}
                        </span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Valor:{" "}
                        <span className="ass-text">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(dados.ass_preco)}
                        </span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Forma de Pagamento:{" "}
                        <span className="ass-text">{dados.fpg_descricao}</span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Assinatura expira em:{" "}
                        <span className="ass-text">{data}</span>
                      </h4>
                    </Col>
                    {renovar && (
                      <Col sm="12" md="6" className="mb-3 center">
                        <Button
                          className="btn-primary"
                          style={{ width: "80%" }}
                        >
                          Renovar
                        </Button>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
