import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { FaHeart, FaHeadphones } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import Comentario from "../../../components/Comentarios";
import Chart from "react-google-charts";
import { Card, CardBody, Container, Row, Col, CardTitle } from "reactstrap";

export default function EditarPodcast() {
  const [podcasts, setPodcasts] = useState([]);
  const [dados, setDados] = useState([]);
  const [topWeek, setTopWeek] = useState([]);
  const [comentario, setComentario] = useState([]);
  const [graphview, setGraphview] = useState([]);

  useEffect(() => {
    let podinicial = null;

    async function exibirPodcasts() {
      const response = await api.get("/userpodcastsAllow");
      setPodcasts(response.data);
      if (response.data.length > 0) {
        podinicial = response.data[0].pod_id;
        loadEstatistica();
        loadComments();
        loadGraph();
      }
    }

    async function loadComments() {
      const response = await api.get(`allcomentarios/${podinicial}`);
      setComentario(response.data);
    }

    async function loadGraph() {
      const graphiview = await api.get(`premiumgrafico/${podinicial}`);
      setGraphview(graphiview.data);
    }

    async function loadEstatistica() {
      const response = await api.get(`/estatisticaspremium/${podinicial}`);
      setDados(response.data);
      console.log("TESTE ", response.data.topweek[0]);
      setTopWeek(response.data.topweek[0]);

      const topWeeks = response.data.topweek[0];
      const labels = [];
      const datasets = [];

      console.log("SLA", datasets);

      topWeeks.map((item) => {
        labels.push(item.pod_nome);
      });
    }

    exibirPodcasts();
    loadEstatistica();
  }, []);

  async function SelecionarPodcast(e) {
    const id = e.target.value;

    console.log("TESTE ->", id);
    const response = await api.get(`/estatisticaspremium/${id}`);
    setDados(response.data);

    const comments = await api.get(`allcomentarios/${id}`);
    setComentario(comments.data);

    const graphiview = await api.get(`premiumgrafico/${id}`);
    setGraphview(graphiview.data);
  }

  return (
    <>
      {console.log("dados", dados)}
      {console.log("pods", podcasts)}
      {console.log("comments", comentario)}
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
                    Desempenho
                  </CardTitle>
                  <Row>
                    <Col sm="12" md="2">
                      <select
                        className="select-home shadow"
                        onChange={SelecionarPodcast}
                        style={{
                          color: "#fff",
                          paddingLeft: 10,
                          paddingRight: 10,
                          width: 160,
                        }}
                        name="select"
                        id="exampleSelect"
                      >
                        <option value="0">Podcast</option>
                        {podcasts.map((item) => (
                          <option key={item.pod_id} value={item.pod_id}>
                            {item.pod_nome}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col lg="3" sm="6">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 100,
                          maxHeight: 100,
                          minWidth: 160,
                          maxWidth: 160,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                        }}
                      >
                        <h3
                          className="text-center"
                          style={{
                            marginTop: 30,
                            marginBottom: 0,
                            color: "rgb(27, 253, 190)",
                            fontWeight: "bold",
                          }}
                        >
                          <MdGrade
                            color="rgb(27, 253, 190)"
                            style={{ marginRight: 5 }}
                            title="Nota média do Podcast na comunidade"
                          />
                          {dados.media
                            ? parseInt(dados.media).toFixed(2)
                            : "N/A"}
                        </h3>
                      </div>
                    </Col>
                    <Col lg="3" sm="6">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 100,
                          maxHeight: 100,
                          minWidth: 160,
                          maxWidth: 160,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                        }}
                      >
                        <h3
                          className="text-center"
                          style={{
                            marginTop: 30,
                            marginBottom: 0,
                            color: "rgb(27, 253, 190)",
                            fontWeight: "bold",
                          }}
                        >
                          <FaHeart
                            color="rgb(27, 253, 190)"
                            style={{ marginRight: 5 }}
                            title="Quantidade de favoritos"
                          />
                          {dados.qtd_fav}
                        </h3>
                      </div>
                    </Col>
                    <Col lg="3" sm="6">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 100,
                          maxHeight: 100,
                          minWidth: 160,
                          maxWidth: 160,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                        }}
                      >
                        <h3
                          className="text-center"
                          style={{
                            marginTop: 30,
                            marginBottom: 0,
                            color: "rgb(27, 253, 190)",
                            fontWeight: "bold",
                          }}
                        >
                          <AiFillSchedule
                            size={32}
                            color="rgb(27, 253, 190)"
                            style={{ marginRight: 5 }}
                            title="Usuários que marcaram como Acompanhando"
                          />
                          {dados.qtd_acompanhando}
                        </h3>
                      </div>
                    </Col>
                    <Col lg="3" sm="6">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 100,
                          maxHeight: 100,
                          minWidth: 160,
                          maxWidth: 160,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                        }}
                      >
                        <h3
                          className="text-center"
                          style={{
                            marginTop: 30,
                            marginBottom: 0,
                            color: "rgb(27, 253, 190)",
                            fontWeight: "bold",
                          }}
                        >
                          <FaHeadphones
                            color="rgb(27, 253, 190)"
                            style={{ marginRight: 5 }}
                            title="Usuários que marcaram como Pretendo Acompanhar"
                          />
                          {dados.qtd_acompanhar}
                        </h3>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="6" md="12">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 400,
                          maxHeight: 400,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                          padding: 20,
                        }}
                      >
                        <h4
                          style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "rgb(27, 253, 190)",
                          }}
                        >
                          Visualizações
                        </h4>
                        <p
                          style={{
                            color: "rgb(27, 253, 190)",
                            marginTop: 30,
                            fontWeight: "bold",
                            fontSize:'1.6rem'
                          }}
                        >
                          Visitas Totais {" - "}
                          {dados.totalview}
                        </p>
                        <p
                          style={{
                            color: "rgb(27, 253, 190)",
                            marginTop: 50,
                            fontWeight: "bold",
                            fontSize:'1.6rem'
                          }}
                        >
                          Visitas último mês {" - "}
                          {dados.totalmonth}
                        </p>
                        <p
                          style={{
                            color: "rgb(27, 253, 190)",
                            marginTop: 50,
                            fontWeight: "bold",
                            fontSize:'1.6rem'
                          }}
                        >
                          Visitas última semana {" - "}
                          {dados.totalweek}
                        </p>
                      </div>
                    </Col>
                    <Col lg="6" md="12">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minHeight: 400,
                          maxHeight: 400,
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                          padding: 20,
                        }}
                      >
                        <h4
                          style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "rgb(27, 253, 190)",
                          }}
                        >
                          Podcasts mais visualizados da última semana
                        </h4>
                        {topWeek.map((item) => (
                          <p
                            style={{
                              color: "rgb(27, 253, 190)",
                              marginTop: 20,
                              fontSize:'1.2rem'
                            }}
                          >
                            <Link
                              to={`../../../podcast/${item.id}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                color: "rgb(27, 253, 190)",
                                fontWeight: "bold",
                              }}
                            >
                              {item.pod_nome}{" "}
                            </Link>
                            {item.qtd_viewtotal}
                          </p>
                        ))}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="12">
                      {graphview.Janeiro && (
                        <Col
                          lg="12"
                          className="mt-1 pt-3"
                          style={{ justifyContent: "center" }}
                        >
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
                              title:
                                "Visualizações do sistema nos últimos meses",
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
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="12">
                      <div
                        className="shadow"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          minWidth: "100%",
                          maxWidth: "100%",
                          borderRadius: 10,
                          marginBottom: 10,
                          background: "#151734",
                        }}
                      >
                        {comentario.length ? (
                          <Comentario
                            data={comentario.map((item) => item)}
                            dash={true}
                          />
                        ) : (
                          <div
                            className="d-flex pt-5 pb-5"
                            style={{ margin: "0 auto" }}
                          >
                            <p
                              className="text-center mb-0"
                              style={{
                                color: "rgb(27, 253, 190)",
                                fontWeight: "bold",
                              }}
                            >
                              Seu podcast ainda não tem comentários.
                            </p>
                          </div>
                        )}
                      </div>
                    </Col>
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
