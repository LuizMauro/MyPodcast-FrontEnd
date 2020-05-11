import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateStatusRequest } from "../../../store/modules/user/actions";
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

export default function Usuario() {
  const [usuario, setUsuario] = useState([]);
  const [userStatus, setUserStatus] = useState(null);
  const [update, setUpdate] = useState(false);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    exibirUsuarios();
  }, [update]);

  async function exibirUsuarios() {
    const response = await api.get("/users");
    setUsuario(response.data);
  }

  async function exibirStatus(status) {
    setUserStatus(status);
    setUpdate(update ? false : true);
  }

  async function mudarStatus(item) {
    try {
      dispatch(updateStatusRequest(item.usu_id, item.usu_status));
      setUpdate(update ? false : true);

      if (item.usu_status) {
        toast.success("Usuário desativado.");
      } else {
        toast.success("Usuário ativado");
      }
    } catch (err) {
      toast.error("Não foi possível ativar/desativar usuário");
    }
  }

  function searchUsuario(e) {
    setSearch(e.target.value);

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
                        onClick={(e) => exibirStatus(null)}
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
                      ? usuario.map((item) =>
                          userStatus === 1 || userStatus === 0 ? (
                            userStatus === item.usu_status && (
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
                                    onClick={(e) => mudarStatus(item)}
                                  >
                                    {item.usu_status ? "Desativar" : "Ativar"}
                                  </button>
                                </div>
                              </PodcastList>
                            )
                          ) : (
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
                      : listSearch.map((item) => (
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
