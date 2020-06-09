import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Card, CardBody, Container, Row, Col, CardTitle , Spinner} from "reactstrap";
import "./index.css";

import Podcasts from "../../../components/Relatorio/Podcasts";
import Usuarios from "../../../components/Relatorio/Usuarios";
import Visualizacoes from "../../../components/Relatorio/Visualizacoes";
import Assinaturas from "../../../components/Relatorio/Assinaturas";
import Ganhos from "../../../components/Relatorio/Ganhos";
import Outros from "../../../components/Relatorio/Outros";
import {
  FaMicrophone,
  FaUserAlt,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaFileContract,
} from "react-icons/fa";

import { GoGraph } from "react-icons/go";


export default function Relatorio() {
  const [relatorio, setRelatorio] = useState([]);
  const [grafico, setGrafico] = useState([]);
  const [graphview, setGraphview] = useState([])
  const [choice, setChoice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    exibirRelatorio();
    //console.log(`Teste`)
  }, []);

  async function exibirRelatorio() {
    const response = await api.get("/relatorio");
    console.log("dados", response.data);
    setRelatorio(response.data);

    const data = await api.get("/grafico");
    setGrafico(data.data);

    const graphview = await api.get("/graficoview");
    setGraphview(graphview.data);
  }

  async function selectRelatorio(choice) {
    setChoice(choice);
  }

  async function gerarPDF(){
    setLoading(true);
    const {data} = await api.get("/pdf");
    const urlPDF = `http://localhost:3333${data}`;
    setTimeout(() => {  window.open(urlPDF); setLoading(false) }, 3000);
   
  }

  return (
    <section className="section section-shaped section-lg">
      <Container>
        <Row className="bg-secondary mb-0 mt-3">
          <Col lg="8">
            <CardTitle style={{ fontSize: 25, color: "#fff", marginTop: 20 }}>
              Relatório do Sistema
            </CardTitle>
          </Col>
          <Col lg="4">
            <CardTitle style={{ fontSize: 25, color: "#fff", marginTop: 20 }}>
              {loading ? (
                 <button className="btn btn-primary" onClick={() => {}}>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                 </button>
              ):(
                <button className="btn btn-primary" onClick={() => gerarPDF()}>Gerar pdf</button>
              )}
              
            </CardTitle>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }} className="bg-secondary pb-3">
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 1
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(1)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 1 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Podcasts
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 1 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <FaMicrophone size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 2
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(2)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 2 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Usuários
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 2 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <FaUserAlt size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 3
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(3)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 3 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Visualizações
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 3 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <GoGraph size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 4
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(4)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 4 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Assinaturas
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 4 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <FaFileContract size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 5
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(5)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 5 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Ganhos
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 5 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <FaFileInvoiceDollar size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4 mt-3">
            <Card
              className={
                choice === 6
                  ? "shadow border-0 pointer relatorio-selected"
                  : "bg-secondary shadow border-0 pointer"
              }
              onClick={() => selectRelatorio(6)}
            >
              <CardBody
                style={{ justifyContent: "center" }}
                enctype="multipart/form-data"
              >
                <CardTitle
                  className={
                    choice === 6 ? "relatorio-selected" : "dash-home-title"
                  }
                >
                  Outros
                </CardTitle>
                <Row className="mt-1" style={{ justifyContent: "center" }}>
                  <h1
                    className={
                      choice === 6 ? "relatorio-selected" : "dash-home-value"
                    }
                  >
                    <FaFileAlt size={48} />
                  </h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {choice > 0 && (
          <Row className="bg-secondary mt-3 pb-3">
            {choice === 1 && <Podcasts relatorio={relatorio} />}
            {choice === 2 && <Usuarios relatorio={relatorio} />}
            {choice === 3 && <Visualizacoes relatorio={relatorio} graphview={graphview} />}
            {choice === 4 && <Assinaturas relatorio={relatorio} grafico={grafico} />}
            {choice === 5 && <Ganhos relatorio={relatorio} grafico={grafico} />}
            {choice === 6 && <Outros relatorio={relatorio} />}
          </Row>
        )}
      </Container>
    </section>
  );
}
