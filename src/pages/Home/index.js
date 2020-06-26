import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../../components/Menu";
import api from "../../services/api";
import { IoIosSearch } from "react-icons/io";
import history from "../../services/history";
import "./index.css";
import publicIp from "react-public-ip";
import Footer from "../../components/Footer/Footer";

import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

import LinesEllipsis from "react-lines-ellipsis/lib/html";

// reactstrap components
import {
  Container, Button, Input, FormGroup, Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardDeck,
  CardImg,
} from "reactstrap";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [select, setSelect] = useState("");
  const [publicidades, setPublicidades] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);
  let limit = 6;

  useEffect(() => {
    loadPodCasts();
    loadCategoria();
    loadPublicidades();
  }, [currentPage]);

  function handleSubmit() {
    history.push(`/pesquisar?select=${select}&pesquisa=${pesquisa}`);
  }

  async function loadPodCasts() {
    const response = await api.get("/podcasts");
    setPodcasts(response.data);

    if (response.data.length <= limit) {
      setLoadMore(0);
    } else if (response.data.length > limit * currentPage) {
      setLoadMore(1);
    } else if (response.data.length < limit * currentPage) {
      setLoadMore(0);
    }

    async function view() {
      const ipv4 = (await publicIp.v4()) || "";
      const ipv6 = (await publicIp.v6()) || "";

      await api.post(`/view/${ipv4 ? ipv4 : ipv6}`);
    }
    view();
  }

  async function load() {
    if (loadMore === 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function loadCategoria() {
    const response = await api.get("/categoria");
    setCategorias(response.data);
  }

  async function loadPublicidades() {
    const response = await api.get("/pubs");

    setPublicidades(response.data);
  }

  return (
    <>
      <Menu></Menu>
      <Container>

        {publicidades && (
          <Container style={{ paddingTop: 40 }}>
            <Carousel slidesPerPage={3} infinite={true} centered keepDirectionWhenDragging breakpoints={{
              640: {
                slidesPerPage: 1,
                arrows: false
              },
              900: {
                slidesPerPage: 2,
                arrows: false
              }
            }} autoPlay={4000} animationSpeed={2000}>

              {publicidades.sort().map((item) => (
                <Link key={item.pub_id}
                  to={`podcast/${item.pub_link}`}
                  style={{ textAlign: "center", color: "#1BFDBE" }}
                >
                  <img src={`http://localhost:3333/files/${item.pub_endereco_img}`} />
                </Link>
              ))}

            </Carousel>
          </Container>
        )}



        <FormGroup className="search-home-shadow">
          <div
            style={{
              display: "flex",
              direction: "row",
              flex: 0.5,
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <div>
              <Input
                className="select-home"
                type="select"
                name="select"
                id="exampleSelect"
                style={{ height: 70, textAlign: "center" }}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option disabled selected>
                  {" "}
                  Selecione{" "}
                </option>
                {categorias.map((item) => (
                  <option key={item.ctg_id} value={item.ctg_id}>
                    {item.ctg_descricao}
                  </option>
                ))}
              </Input>
            </div>
            <div style={{ flex: 2 }}>
              <Input
                onChange={(e) => setPesquisa(e.target.value)}
                className="input-search-home"
                type="text"
                style={{ height: 70, }}
                name="pesquisa"
                placeholder="Busque um podcast aqui:"
              />
            </div>

            <div className="button-div" style={{ lex: 1 }}>
              <Button
                onClick={handleSubmit}
                style={{ height: 70 }}
                className="button-search-home"
              >
                <IoIosSearch size={30}></IoIosSearch>
              </Button>
            </div>
          </div>
        </FormGroup>
      </Container>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", flexWrap: "wrap" }}>

        {/* <div style={{width:180, height: 500, background: "red"}}>
          teste
        </div> */}

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <section className="section section-shaped">
            <Container className="pt-lg-1">
              <h3 className="main-title">Podcasts em destaque</h3>
              <CardDeck>
                {podcasts
                  .filter((pod) => pod.pod_destaque === 1)
                  .slice(0, limit * currentPage)
                  .map((item) => (
                    <Col
                      key={item.pod_id}
                      lg="6"
                      md="6"
                      xs="12"
                      style={{ marginTop: 20, padding: 0 }}
                    >
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
                            <CardBody style={{ padding: 0, minHeight: 250 }}>
                              <CardTitle
                                style={{ fontSize: 20, fontWeight: "normal" }}
                                className="text-center"
                              >
                                <Link
                                  to={`podcast/${item.pod_id}`}
                                  style={{
                                    textAlign: "center",
                                    color: "#1BFDBE",
                                  }}
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
                                  padding: 5,
                                  marginTop: 10,
                                }}
                              >
                                <LinesEllipsis
                                  style={{ textAlign: "justify" }}
                                  unsafeHTML={item.pod_descricao}
                                  maxLine="4"
                                  ellipsis="..."
                                  basedOn="letters"
                                />
                              </div>

                              <Link
                                to={`podcast/${item.pod_id}`}
                                style={{
                                  textAlign: "center",
                                  color: "#1BFDBE",
                                }}
                              >
                                Ver mais
                              </Link>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
              </CardDeck>
              <Col
                lg="12"
                sm="12"
                className="mt-3"
                style={
                  loadMore === 0 ? { display: "none" } : { textAlign: "center" }
                }
              >
                <Button className="btn-primary" onClick={load}>
                  {loadMore === 1 && `Mostrar Mais`}
                </Button>
              </Col>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
}
