import React, { useRef, useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateSolicitacaoRequest } from "../../../store/modules/podcast/actions";
import { FaSpotify, FaInternetExplorer, FaYoutube } from "react-icons/fa";
import PodcastCard from "../../../styles/ItemCard";

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default function Solicitacao() {
  const [solicitacao, setSolicitacao] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    exibirSolicitacoes();
  }, [modal]);

  async function toggle(item) {
    setPodcast(item);
    if (!modal) {
      setCategoria(item.ctg_descricao.split(","));
      setEndereco(item.end_link.split(","));
    }

    setModal(!modal);
  }

  async function exibirSolicitacoes() {
    const response = await api.get("/podcasts/solicitacao");
    console.log(response.data);
    setSolicitacao(response.data);
  }

  async function permitir(pod_id, pod_permissao) {
    try {
      dispatch(updateSolicitacaoRequest(pod_id, pod_permissao));

      if (pod_permissao === 1) {
        toast.success("Cadastro de Podcast permitido");
      } else {
        toast.success("Cadastro de Podcast recusado");
      }
    } catch (err) {
      toast.success("Falha ao tentar aprovar/recusar Podcast");
    }

    console.log("id é", pod_id);
    console.log("permissão é", pod_permissao);
    setModal(!modal);
  }

  return (
    <>
      {console.log(solicitacao)}
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
                    {solicitacao.length} Solicitações de Cadastro
                  </CardTitle>
                  {solicitacao.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        padding: 20,
                        justifyContent: "space-around",
                      }}
                    >
                      {solicitacao.map((item) => (
                        <div
                          className="shadow"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 200,
                            maxHeight: 200,
                            margin: 5,
                            marginBottom: 20,
                            minWidth: 400,
                            maxWidth: 500,
                            borderRadius: 10,
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
                            {item.pod_nome}
                          </h3>
                          <div style={{ display: "flex" }}>
                            <p
                              style={{
                                paddingLeft: 20,
                                marginBottom: 0,
                                color: "rgb(255, 255, 255)",
                                fontSize: "1rem",
                                fontWeight: "bold",
                              }}
                            >
                              Usuário:{" "}
                            </p>
                            <h6
                              style={{
                                paddingLeft: 10,
                                paddingTop:1,
                                marginBottom: 0,
                                color: "rgb(27, 253, 190)",
                                fontSize: "1rem",
                                fontWeight: "bold",
                              }}
                            >
                              {item.usu_nome}
                            </h6>
                          </div>
                          <div
                            style={{ display: "flex", flex: 1, padding: 20 }}
                          >
                            <button
                              style={{
                                color: "#151734",
                                width: "100%",
                                height: 50,
                                borderRadius: 4,
                                background: "#1bfdbe",
                                borderColor: "#1bfdbe",
                                fontWeight: "bold",
                              }}
                              onClick={(e) => toggle(item)}
                            >
                              Ver detalhes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "#fff",
                      }}
                    >
                      Nenhuma solicitação de cadastro no momento.
                    </h2>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <div style={!modal ? { display: "none" } : { display: "block" }}>
          >
          <Modal isOpen={modal} style={{ minWidth: "80%" }} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              <h3 style={{ fontSize: 25, color: "#fff" }}>
                Solicitação de Cadastro
              </h3>
            </ModalHeader>

            <ModalBody style={{ paddingTop: "0 !important" }}>
              <div
                className="bg-secondary shadow"
                style={{
                  marginTop: "0",
                  display: "flex",
                  flexWrap: "wrap",
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    height: "auto",
                    minWidth: 300,
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 auto",
                  }}
                >
                  <div className="img" style={{ padding: 20 }}>
                    <img
                      className="shadow podcast-image"
                      src={`http://localhost:3333/files/${podcast.pod_endereco_img}`}
                    />
                  </div>

                  <div
                    style={{
                      padding: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    minWidth: 300,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1 }} className="borderBottom p-3">
                    <h2 style={{ color: "#fff", marginTop: 20 }}>
                      <strong>{podcast.pod_nome}</strong>
                    </h2>
                  </div>

                  <div
                    style={{ height: "auto", flex: 1 }}
                    className="borderBottom p-3"
                  >
                    <h5 style={{ color: "#fff" }}>
                      <strong>Categorias</strong>
                    </h5>
                    <div
                      className="categorias-wrapper"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {categoria.map((cat) => (
                        <div
                          style={{
                            padding: 5,
                            margin: 5,
                            backgroundColor: "#212454",
                            borderRadius: 5,
                            color: "#fff",
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ flex: 1 }} className="borderBottom p-3">
                    <p style={{ color: "#fff", textAlign: "justify" }}>
                      {podcast.pod_descricao}
                    </p>
                  </div>

                  <div
                    style={{ flex: 1, display: "flex" }}
                    className="borderBottom info-podcast"
                  >
                    <div
                      style={{
                        margin: 20,
                        borderRadius: 5,
                        color: "#fff",
                      }}
                    >
                      <h5 style={{ color: "#fff" }}>
                        <strong>Ano de criação</strong>
                      </h5>
                      <p>{podcast.pod_anocriacao}</p>
                    </div>
                    <div
                      style={{
                        margin: 20,
                        borderRadius: 5,
                        color: "#fff",
                      }}
                    >
                      <h5 style={{ color: "#fff" }}>
                        <strong>Podcaster</strong>
                      </h5>
                      <p>{podcast.pod_criador}</p>
                    </div>
                    <div
                      style={{
                        margin: 20,
                        borderRadius: 5,
                        color: "#fff",
                      }}
                    >
                      <h5 style={{ color: "#fff" }}>
                        <strong>Média de Duração</strong>
                      </h5>
                      <p>{podcast.pod_duracao}min</p>
                    </div>
                  </div>

                  <div className="p-3" style={{ height: "auto", flex: 1 }}>
                    <h5 style={{ color: "#fff" }}>Disponivel em</h5>
                    <div style={{ display: "grid" }}>
                      {endereco.map(
                        (item) =>
                          item.includes(".com") && (
                            <a
                              href={item}
                              target="_blank"
                              style={{
                                color: "rgb(255, 255, 255)",
                                marginBottom: 5,
                              }}
                            >
                              {item}
                            </a>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                onClick={(e) => permitir(podcast.pod_id, 1)}
              >
                Aceitar Cadastro
              </Button>{" "}
              <Button
                color="secondary"
                onClick={(e) => permitir(podcast.pod_id, 2)}
              >
                Recusar Cadastro
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </section>
    </>
  );
}
