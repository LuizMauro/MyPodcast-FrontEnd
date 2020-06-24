import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateStatusRequest } from "../../../store/modules/user/actions";
import PodcastList from "../../../styles/ItemList";
import "./style.css";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
} from "reactstrap";

export default function Usuario() {
  const [usuario, setUsuario] = useState([]);
  const [userStatus, setUserStatus] = useState(3);
  const [update, setUpdate] = useState(false);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);
  const dispatch = useDispatch();
  let limit = 10;

  useEffect(() => {
    if (!update) {
      exibirUsuarios();
      setUpdate(true);
    }
  }, [update, currentPage]);

  async function exibirUsuarios() {
    const response = await api.get("/users");
    setUsuario(response.data);

    if (response.data.length <= limit) {
      setLoadMore(0);
    } else if (response.data.length > limit * currentPage) {
      setLoadMore(1);
    } else if (response.data.length < limit * currentPage) {
      setLoadMore(0);
    }
  }

  async function load() {
    if (loadMore === 1) {
      setCurrentPage(currentPage + 1);
    }
    setUpdate(false);
  }

  async function exibirStatus(status) {
    setUpdate(false);
    setUserStatus(status);
    //setUpdate(item);
  }

  function mudarStatus(item) {
    try {
      const teste = dispatch(updateStatusRequest(item.usu_id, item.usu_status));
      console.log("update", update);
      setUpdate(false);
      //console.log("teste", teste);

      if (item.usu_status) {
        toast.success("Usuário desativado.");
      } else {
        toast.success("Usuário ativado");
      }
      //  exibirUsuarios();
    } catch (err) {
      toast.error("Não foi possível ativar/desativar usuário");
    }
  }

  function searchUsuario(e) {
    setSearch(e.target.value);
    setLoadMore(0);

    setListSearch(
      usuario.filter(({ usu_nome }) =>
        usu_nome.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

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
                  <Row
                    style={{ display: "flex", justifyContent: "start" }}
                    className="borderBottom"
                  >
                    <Col lg="6">
                      <Col className="form-group">
                        <input
                          className="has-success form-control"
                          placeholder="Buscar Usuario"
                          type="text"
                          onChange={(e) => searchUsuario(e)}
                          style={{
                            backgroundColor: "#232659",
                            border: "none",
                            color: "#fff",
                            placeContent: { color: "#fff" },
                          }}
                        />
                      </Col>
                    </Col>
                  </Row>
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    {usuario.length} Usuários no sistema
                  </CardTitle>
                  <Row className="mt-1">
                    <Col md="2" xs="4">
                      <button
                        className="button"
                        onClick={(e) => exibirStatus(3)}
                        style={{
                          color: "rgb(27, 253, 190)",
                          fontWeight: "bold",
                        }}
                      >
                        Todos
                      </button>
                    </Col>
                    <Col md="2" xs="4">
                      <button
                        style={{
                          color: "rgb(27, 253, 190)",
                          fontWeight: "bold",
                        }}
                        className="button"
                        onClick={(e) => exibirStatus(1)}
                      >
                        Ativados
                      </button>
                    </Col>
                    <Col md="2" xs="4">
                      <button
                        style={{
                          color: "rgb(27, 253, 190)",
                          fontWeight: "bold",
                        }}
                        className="button"
                        onClick={(e) => exibirStatus(0)}
                      >
                        Desativados
                      </button>
                    </Col>
                    <Col className="text-right" xs="6"></Col>
                  </Row>
                  <Row className="my-3">
                    <Col xs="6" style={{ color: "rgb(255, 255, 255)" }}>
                      Usuário
                    </Col>
                    <Col xs="6" style={{ color: "rgb(255, 255, 255)" }}>
                      Perfil
                    </Col>
                    <Col className="text-right" xs="6"></Col>
                  </Row>

                  <ul>
                    {!searchValue
                      ? usuario.slice(0, limit * currentPage).map((item) =>
                          userStatus === 1 || userStatus === 0
                            ? userStatus === item.usu_status && (
                                <PodcastList>
                                  <div
                                    className="subitem"
                                    style={{
                                      fontSize: "21px",
                                      color: "rgb(27, 253, 190",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.usu_nome}
                                  </div>
                                  <div
                                    className="subitem"
                                    style={{
                                      fontSize: "21px",
                                      color: "rgb(27, 253, 190",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.tus_descricao}
                                  </div>
                                  <div className="icons">
                                    <button
                                      style={{ fontSize: "21px" }}
                                      className="button"
                                      onClick={(e) => mudarStatus(e)}
                                    >
                                      {item.usu_status ? "Desativar" : "Ativar"}
                                    </button>
                                  </div>
                                </PodcastList>
                              )
                            : userStatus === 3 && (
                                <PodcastList>
                                  <div
                                    className="subitem"
                                    style={{
                                      fontSize: "21px",
                                      color: "rgb(27, 253, 190",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.usu_nome}
                                  </div>
                                  <div
                                    className="subitem"
                                    style={{
                                      fontSize: "21px",
                                      color: "rgb(27, 253, 190",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.tus_descricao}
                                  </div>
                                  <div className="icons">
                                    <button
                                      className="button"
                                      onClick={(e) => mudarStatus(item)}
                                      style={{ fontSize: "21px" }}
                                    >
                                      {item.usu_status ? "Desativar" : "Ativar"}
                                    </button>
                                  </div>
                                </PodcastList>
                              )
                        )
                      : listSearch.slice(0, limit * currentPage).map((item) => (
                          <PodcastList>
                            <div
                              className="subitem"
                              style={{
                                fontSize: "21px",
                                color: "rgb(27, 253, 190",
                                fontWeight: "bold",
                              }}
                            >
                              {item.usu_nome}
                            </div>
                            <div
                              className="subitem"
                              style={{
                                fontSize: "21px",
                                color: "rgb(27, 253, 190",
                                fontWeight: "bold",
                              }}
                            >
                              {item.tus_descricao}
                            </div>
                            <div className="icons">
                              <button
                                className="button"
                                onClick={(e) => mudarStatus(item)}
                                style={{ fontSize: "21px" }}
                              >
                                {item.usu_status ? "Desativar" : "Ativar"}
                              </button>
                            </div>
                          </PodcastList>
                        ))}
                  </ul>
                  <Col
                    lg="12"
                    sm="12"
                    style={
                      loadMore === 0
                        ? { display: "none" }
                        : { textAlign: "center" }
                    }
                  >
                    <Button className="btn-primary" onClick={load}>
                      {loadMore === 1 && `Mostrar Mais`}
                    </Button>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
