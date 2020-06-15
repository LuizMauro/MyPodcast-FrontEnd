import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCategoriaRequest } from "../../../../store/modules/categoria/actions";

import Input from "../../../../components/Input";
import PodcastList from "../../../../styles/ItemList";
import { FaPen, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

export default function EditarPodcast() {
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);
  const [categorias, setCategorias] = useState([]);
  const [editarCat, setEditarCat] = useState([]);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);
  const [categoriaPage, setCategoriaPage] = useState([]);
  const dispatch = useDispatch();
  let limit = 10;

  useEffect(() => {
    exibirCategorias({});
  }, [editMode, categorias]);

  async function exibirCategorias() {
    const response = await api.get("/categoria");
    setCategoriaPage(response.data);

    if (categoriaPage.length <= limit) {
      setLoadMore(0);
    } else if (categorias.length < categoriaPage.length) {
      setLoadMore(1);
    } else {
      setLoadMore(2);
    }

    loadCategorias();
  }

  async function load() {
    if (loadMore === 1) {
      setCurrentPage(currentPage + 1);
      loadCategorias();
    } else if (loadMore === 2) {
      setCurrentPage(currentPage - 1);
      loadCategorias();
    }
  }

  async function loadCategorias() {
    setCategorias(categoriaPage.slice(0, limit * currentPage));
  }

  async function editarCategoria(categoria) {
    setEditMode(true);
    setEditarCat(categoria);
  }

  async function handleSubmit({ ctg_descricao }) {
    const ctgid = editarCat.ctg_id;

    const data = new FormData();

    data.append("ctg_descricao", ctg_descricao);

    try {
      dispatch(updateCategoriaRequest(ctg_descricao, ctgid));
      setEditMode(false);
      setUpdate(update ? false : true);
    } catch (err) {
      toast.error("Não foi possível editar categoria");
    }
  }

  function searchCategoria(e) {
    setSearch(e.target.value);

    setListSearch(
      categorias.filter(({ ctg_descricao }) =>
        ctg_descricao.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      {console.log(categorias)}
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
                    style={
                      editMode
                        ? { display: "none" }
                        : { display: "flex", justifyContent: "flex-end" }
                    }
                    className="borderBottom"
                  >
                    <Col lg="6">
                      <Col className="form-group">
                        <input
                          className="has-success form-control"
                          placeholder="Buscar Categoria"
                          type="text"
                          onChange={(e) => searchCategoria(e)}
                          style={{
                            backgroundColor: "#232659",
                            border: "none",
                            color: "#fff",
                            placeContent: { color: "#fff" },
                          }}
                        />
                      </Col>
                    </Col>
                    <Col lg="6" style={{ textAlign: "end" }}>
                      <Link
                        className="btn btn-primary"
                        to="categorias/cadastrar"
                      >
                        <FaPlus size={18} /> Categoria
                      </Link>
                    </Col>
                  </Row>
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    {editMode
                      ? `Editar Categoria`
                      : `${categoriaPage.length} Categorias cadastradas`}
                  </CardTitle>

                  <MdClose
                    size={24}
                    color={"#fff"}
                    className="closeIcon"
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                    onClick={() => setEditMode(false)}
                  />
                  <ul
                    style={
                      editMode ? { display: "none" } : { display: "block" }
                    }
                  >
                    {searchValue === ""
                      ? categorias.map((item) => (
                          <PodcastList>
                            <div className="item">
                              <Link
                                to={`../../../podcast/${item.ctg_id}`}
                                className="linktittle"
                                style={{ color: "#1bfdbe", fontWeight: "bold" }}
                              >
                                {item.ctg_descricao}
                              </Link>
                            </div>
                            <div className="icons">
                              <button
                                className="button edit"
                                onClick={(e) => editarCategoria(item)}
                              >
                                <FaPen size={18} />
                              </button>
                            </div>
                          </PodcastList>
                        ))
                      : listSearch.map((item) => (
                          <PodcastList>
                            <div className="item">
                              <Link
                                to={`../../../podcast/${item.ctg_id}`}
                                className="linktittle"
                                style={{ color: "#1bfdbe", fontWeight: "bold" }}
                              >
                                {item.ctg_descricao}
                              </Link>
                            </div>
                            <div className="icons">
                              <button
                                className="button edit"
                                onClick={(e) => editarCategoria(item)}
                              >
                                <FaPen size={18} />
                              </button>
                            </div>
                          </PodcastList>
                        ))}
                  </ul>

                  <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={editarCat}
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                  >
                    <Input
                      name="ctg_descricao"
                      type="text"
                      placeholder="Descrição da Categoria"
                    />

                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Salvar Alterações
                      </Button>
                    </div>
                  </Form>
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
                      {loadMore === 1 ? `Mostrar Mais` : `Mostrar Menos`}
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
