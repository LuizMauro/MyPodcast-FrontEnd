import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateModeradorRequest } from "../../../store/modules/user/actions";
import api from "../../../services/api";
import { toast } from "react-toastify";

import PodcastList from "../../../styles/ItemList";
import "./style.css";

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

export default function Moderador() {
  const [usuario, setUsuario] = useState([]);
  const [tusId, setTusId] = useState(3);
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
    const response = await api.get("adm/modusers");
    setUsuario(response.data);

    if (response.data.length <= limit) {
      setLoadMore(0);
    } else if (response.data.length > limit * currentPage) {
      setLoadMore(1);
    } else if (response.data.length > limit * currentPage) {
      setLoadMore(0);
    }
  }

  async function load() {
    if (loadMore === 1) {
      setCurrentPage(currentPage + 1);
    }
    setUpdate(false);
  }

  async function exibirEspecifico(status) {
    setTusId(status);
    setUpdate(false);
  }

  async function mudarTusId(item) {
    try {
      dispatch(updateModeradorRequest(item.usu_id, item.tus_id));
      setUpdate(false);

      if (item.tus_id === 3) {
        toast.success("O usuário não é mais moderador");
      } else {
        toast.success("O usuário agora é moderador");
      }
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
                    {tusId === 3
                      ? "Moderadores do Sistema"
                      : "Adicionar Moderador"}
                  </CardTitle>
                  <Row className="mt-1">
                    <Col md="3" xs="5">
                      <button
                        className={tusId === 3 ? "button activated" : "button"}
                        style={{
                          color: "rgb(255, 255, 255)",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onClick={(e) => exibirEspecifico(3)}
                      >
                        Moderadores
                      </button>
                    </Col>
                    <Col md="5" xs="7">
                      <button
                        className={tusId === 1 ? "button activated" : "button"}
                        style={{
                          color: "rgb(255, 255, 255)",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                        onClick={(e) => exibirEspecifico(1)}
                      >
                        Adicionar Moderador
                      </button>
                    </Col>
                    <Col className="text-right" xs="6"></Col>
                  </Row>

                  <ul className="my-3">
                    {!searchValue
                      ? usuario.slice(0, limit * currentPage).map(
                          (item) =>
                            tusId === item.tus_id && (
                              <PodcastList>
                                <div
                                  className="item"
                                  style={{
                                    fontSize: "21px",
                                    color: "rgb(27, 253, 190)",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.usu_nome}
                                </div>
                                <div
                                  className="subitem"
                                  style={{ textAlign: "end" }}
                                >
                                  <button
                                    className="edit button"
                                    onClick={(e) => mudarTusId(item)}
                                  >
                                    {item.tus_id === 1
                                      ? "Tornar Moderador"
                                      : "Remover Moderação"}
                                  </button>
                                </div>
                              </PodcastList>
                            )
                        )
                      : listSearch.slice(0, limit * currentPage).map((item) => (
                          <PodcastList>
                            <div
                              className="item"
                              style={{
                                fontSize: "21px",
                                color: "rgb(27, 253, 190)",
                                fontWeight: "bold",
                              }}
                            >
                              {item.usu_nome}
                            </div>
                            <div
                              className="subitem"
                              style={{ textAlign: "end" }}
                            >
                              <button
                                className="edit button"
                                onClick={(e) => mudarTusId(item)}
                              >
                                {item.tus_id === 1
                                  ? "Tornar Moderador"
                                  : "Remover Moderação"}
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
