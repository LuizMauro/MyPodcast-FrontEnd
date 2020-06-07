import React, {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { FaHeart, FaHeadphones } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import Comentario from "../../../components/Comentarios";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

import { Line, Bar } from 'react-chartjs-2';


const data = {
   labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
  'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.3,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#1bfdbe',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#1bfdbe',
      pointHoverBorderColor: '#1bfdbe',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My First dataset 2',
      fill: false,
      lineTension: 0.3,
      backgroundColor: '#ff6384',
      borderColor: '#ff6384',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#ff6384',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#ff6384',
      pointHoverBorderColor: '#ff6384',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [20, 3, 30, 2, 100, 15, 20]
    }
  ],
  
};

const data2 = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
  'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#1bfdbe',
      borderColor: '#1bfdbe',
      borderWidth: 1,
      hoverBackgroundColor: '#1bfdbe',
      hoverBorderColor: '#1bfdbe',
      data: [65, 59, 80]
    },
    {
      label: 'My First dataset 2',
      backgroundColor: '#ff6384',
      borderColor: '#ff6384',
      borderWidth: 1,
      hoverBackgroundColor: '#ff6384',
      hoverBorderColor: '#ff6384',
      data: [30, 100, 80]
    }
  ]
};


export default function EditarPodcast() {
  const [podcasts, setPodcasts] = useState([]);
  const [dados, setDados] = useState([]);
  const [topWeek, setTopWeek] = useState([]);
  const [comentario, setComentario] = useState([]);
  const [teste, setTeste] = useState({});

  useEffect(() => {
    let podinicial = null;

    async function exibirPodcasts() {
      const response = await api.get("/userpodcastsAllow");
      setPodcasts(response.data);
      if (response.data.length > 0) {
        podinicial = response.data[0].pod_id;
        loadEstatistica();
        loadComments();
      }
    }
    

    async function loadComments() {
      const response = await api.get(`allcomentarios/${podinicial}`);
      setComentario(response.data);
    }

    async function loadEstatistica() {
      const response = await api.get(`/estatisticaspremium/${podinicial}`);
      setDados(response.data);
      console.log("TESTE ", response.data.topweek[0]);
      setTopWeek(response.data.topweek[0]);

      const topWeeks = response.data.topweek[0];
      const labels = [];
      const datasets = [];

      topWeeks.map((week, i) => {
        datasets.push({
          label: "High Low",
          backgroundColor: '#ff6384',
          borderColor: '#ff6384',
          borderWidth: 1,
          hoverBackgroundColor: '#ff6384',
          hoverBorderColor: '#ff6384',
          data:[1 , 2]
        })
      })

      console.log("SLA",datasets);

      topWeeks.map((item) =>{
        labels.push(item.pod_nome)
      })

      const graficoData = {
        labels: ["teste", "High Low"],
        datasets
       
    }
    setTeste(graficoData);
  }

   
    exibirPodcasts();
    loadEstatistica();
  }, []);

  async function SelecionarPodcast(e) {
    const id = e.target.value;
    
    console.log("TESTE ->" , id);
    const response = await api.get(`/estatisticaspremium/${id}`);
    setDados(response.data);

    const comments = await api.get(`allcomentarios/${id}`);
    setComentario(comments.data);
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

                        <option  value="0">Podcast</option>
                        {podcasts.map((item) => (
                            <option key={item.pod_id} value={item.pod_id}>{item.pod_nome}</option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col lg="12" sm="12" >
                      <h1>Teste 1</h1>
                        <Line data={data} width={100} height={"50%"} options={{
                            responsive: true,
                            maintainAspectRatio: true,
                          }}  color={"#1bfdbe"}  />
                      </Col>

                      <Col lg="12" sm="12" >
                      <h1>Teste 4</h1>
                        <Bar data={teste} width={100} height={"50%"} options={{
                            responsive: true,
                            maintainAspectRatio: true,
                          }}   />
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
                            marginTop: 50,
                            fontWeight: "bold",
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
