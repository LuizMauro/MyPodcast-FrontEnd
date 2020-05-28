import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "../../components/Menu/index";

import api from "../../services/api";

import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardDeck,
  CardImg,
} from "reactstrap";

export default function Pesquisar() {
  const [podcasts, setPodcasts] = useState([]);
  let query = new URLSearchParams(useLocation().search);
  const select = query.get("select");

  async function loadPodCastsAll() {
    const response = await api.get("/allpodcasts");
    setPodcasts(response.data);
  }

  async function loadPodCastsCategoria(select) {
    const response = await api.get(`/pesquisar/${select}`);
    setPodcasts(response.data);
  }

  async function loadPodCastsNome(pesquisa) {
    const response = await api.get(`/pesquisarnome/${pesquisa}`);
    setPodcasts(response.data);
  }

  async function loadPodCastsCategoriaAndNome(select, pesquisa) {
    const response = await api.get(`/pesquisar/nome/${select}/${pesquisa}`);

    setPodcasts(response.data);
  }

  useEffect(() => {
    const select = query.get("select");
    const pesquisa = query.get("pesquisa");

    if (select === "" && pesquisa === "") {
      loadPodCastsAll();
    } else if (select === "" && pesquisa !== "") {
      loadPodCastsNome(pesquisa);
    } else if (select !== "" && pesquisa === "") {
      loadPodCastsCategoria(select);
    } else if (select !== "" && pesquisa !== "") {
      loadPodCastsCategoriaAndNome(select, pesquisa);
    }
  }, []);

  return (
    <>
      <Menu />
      <section className="section section-shaped">
        <Container className="pt-lg-1">
          <p className="h2 p mt-3">{podcasts.length} Resultados encontrados</p>
          {!select && <p className="h4 p">Todas as categorias</p>}

          <CardDeck>
            {podcasts.map((item) => (
              <Col lg="6" md="6" xs="12" style={{ marginTop: 20, padding: 0 }}>
                <Card style={{ minHeight: 200, background: "#151734 " }}>
                  <Row>
                    <Col lg="6" md="6" xs="12">
                      <Link to={`podcast/${item.pod_id}`}>
                        <CardImg
                          width="100%"
                          style={{ borderRadius: 4 }}
                          height="200"
                          src={`http://localhost:3333/files/${item.pod_endereco_img}`}
                          alt={item.pod_nome}
                        />
                      </Link>
                    </Col>

                    <Col lg="6" md="6" xs="12">
                      <CardBody style={{ padding: 0 }}>
                        <CardTitle
                          style={{ fontSize: 20, fontWeight: "normal" }}
                          className="text-center"
                        >
                          <Link
                            to={`podcast/${item.pod_id}`}
                            style={{ textAlign: "center", color: "#1BFDBE" }}
                          >
                            {item.pod_nome}
                          </Link>
                        </CardTitle>

                        <div
                          style={{
                            flexWrap: "wrap",
                            display: "flex",
                            placeContent: "center",
                            margin: 0,
                            padding: 0,
                            marginTop: 10,
                          }}
                        >
                          {item.ctg_descricao.split(",").map((cat) => (
                            <span className="badge bg-green m-2">{cat}</span>
                          ))}
                        </div>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </CardDeck>
        </Container>
      </section>
    </>
  );
}
