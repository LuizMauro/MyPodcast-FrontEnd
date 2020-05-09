import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import api from "../../../../services/api";
import Textarea from "../../../../components/Textarea";
import history from "../../../../services/history";
import { toast } from "react-toastify";

import Input from "../../../../components/Input";
import FileInput from "../../../../components/FileInput/FileInput";
import PodcastList from "../../../../styles/ItemList";
import { FaPen, FaTimes, FaPlus } from "react-icons/fa";
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
  const [file, setFile] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [editarPod, setEditarPod] = useState([]);
  const [update, setUpdate] = useState(false);
  const [preview, setPreview] = useState(null);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [selectCategorias, setSelectCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);

  useEffect(() => {
    exibirPodcasts();
  }, [update]);

  async function exibirPodcasts() {
    const response = await api.get("/userpodcasts");
    console.log(response.data);
    setPodcasts(response.data);
  }

  async function deletarPodcast(podcast) {
    try {
      await api.put(`podcaster/podcast/${podcast.pod_id}/0`);

      setUpdate(update ? false : true);
      toast.success("Podcast deletado");
    } catch (err) {
      setUpdate(update ? false : true);
      toast.error("Não foi possível deletar podcast.");
    }
  }

  async function editarPodcast(podcast) {
    const links = podcast.end_link.split(",");
    console.log("links aq", podcast.end_link);

    podcast.end_link1 = links[0];
    podcast.end_link2 = links[1];
    podcast.end_link3 = links[2];

    console.log(podcast.ctg_id);
    setEditMode(true);
    setEditarPod(podcast);

    const response = await api.get("/categoria");
    setAllCategorias(response.data);

    const respAllCategorias = response.data;
    const categoriasResponse = podcast.ctg_id.split(",");

    console.log(podcast);

    setPreview(`http://localhost:3333/files/${podcast.pod_endereco_img}`);

    setSelectCategorias(
      respAllCategorias.filter(({ ctg_id }) =>
        categoriasResponse.includes(ctg_id.toString())
      )
    );
  }

  function removeCategoria(cat) {
    console.log(cat.ctg_id);
    //setSelectIdCategorias(selectIdCategorias.filter(item => item !== id))
    setSelectCategorias([...selectCategorias.filter((obj) => obj !== cat)]);
  }

  function setCategoria(cat) {
    if (cat) {
      if (selectCategorias.length === 5) {
        toast.error("O podcast pode ter no máximo 5 categorias");
        return;
      }

      //setSelectIdCategorias([...selectIdCategorias, i])
      setSelectCategorias([...selectCategorias, cat]);
    }
  }

  function getFile(file) {
    setPreview(URL.createObjectURL(file));
    setFile(file);
  }

  function deletePreview() {
    setPreview(null);
    setFile(null);
  }

  async function handleSubmit({
    pod_nome,
    pod_descricao,
    pod_criador,
    pod_anocriacao,
    pod_duracao,
    end_link1,
    end_link2,
    end_link3,
  }) {
    if (selectCategorias.length > 5) {
      toast.error("O podcast pode ter no máximo 5 categorias");
      return;
    }

    const aux = allCategorias.filter((obj) => !selectCategorias.includes(obj));
    const arrayFinal = [];

    aux.map((item) => {
      arrayFinal.push(item.ctg_id);
    });

    console.log("ENVIANDO PARA O BANCO -> ", arrayFinal);
    console.log("ENVIANDO PARA O BANCO -> ", arrayFinal);

    const data = new FormData();

    data.append("pod_nome", pod_nome);
    data.append("pod_descricao", pod_descricao);
    data.append("pod_criador", pod_criador);
    data.append("pod_anocriacao", pod_anocriacao);
    data.append("pod_duracao", pod_duracao);
    data.append("pod_status", 1);
    data.append("pod_permissao", 1);
    data.append("pod_destaque", 0);
    data.append("list_of_categoria", arrayFinal);
    data.append("end_link1", end_link1);
    data.append("end_link2", end_link2);
    data.append("end_link3", end_link3);
    data.append("file", file);

    const pod_id = editarPod.pod_id;

    try {
      const schema = Yup.object().shape({
        pod_nome: Yup.string().required("O nome do Podcast é obrigatório"),
        pod_descricao: Yup.string().required(
          "A descrição do Podcast é obrigatória"
        ),
        pod_criador: Yup.string().required("O nome do criador é obrigatório"),
        pod_anocriacao: Yup.string().required("O ano de criação é obrigatório"),
        pod_duracao: Yup.string().required("A duração é obrigatória"),
        ctg_id: Yup.string().required("As categorias são obrigatórias"),
        end_link1: Yup.string().required("O 1º endereço é obrigatório"),
      });

      const response = await api.put(`podcaster/editarpodcast/${pod_id}`, data);

      if (response.data.podEdited) {
        toast.success("Podcast editado!");
        setUpdate(update ? false : true);
        history.push("/podcaster/dashboard/podcasts");
        console.log(response.data);
      } else if (response.data.nomeExists) {
        toast.error("Nome de Podcast já cadastrado");
      } else if (response.data.descricaoExists) {
        toast.error("Descrição é igual a de um podcast já cadastrado");
      } else if (response.data.linkExists) {
        toast.error("Link(s) inválido(s)");
      }
      console.log(response.data);

      formRef.current.setErrors(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        console.log(errorMessages);

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  function searchPodcast(e) {
    setSearch(e.target.value);

    setListSearch(
      podcasts.filter(({ pod_nome }) =>
        pod_nome.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      {console.log(podcasts)}
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
                          placeholder="Buscar Podcast"
                          type="text"
                          onChange={(e) => searchPodcast(e)}
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
                      <Link className="btn btn-primary" to="podcasts/cadastrar">
                        <FaPlus size={18} /> Podcast
                      </Link>
                    </Col>
                  </Row>
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    {editMode
                      ? `Editar Podcast`
                      : `${podcasts.length} Podcasts Cadastrados`}
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
                      ? podcasts.map((item) => (
                          <PodcastList>
                            <div className="item">
                              <Link
                                to={`../../../podcast/${item.pod_id}`}
                                className="linktittle"
                                style={{ color: "#1bfdbe", fontWeight: "bold" }}
                              >
                                {item.pod_nome}
                              </Link>
                            </div>
                            <div className="icons">
                              <button
                                className="button edit"
                                onClick={(e) => editarPodcast(item)}
                              >
                                <FaPen size={18} />
                              </button>
                              <button
                                className="button delete"
                                onClick={(e) => deletarPodcast(item)}
                              >
                                <FaTimes size={18} />
                              </button>
                            </div>
                          </PodcastList>
                        ))
                      : listSearch.map((item) => (
                          <PodcastList>
                            <div className="item">
                              <Link
                                to={`../../../podcast/${item.pod_id}`}
                                className="linktittle"
                                style={{ color: "#1bfdbe", fontWeight: "bold" }}
                              >
                                {item.pod_nome}
                              </Link>
                            </div>
                            <div className="icons">
                              <button
                                className="button edit"
                                onClick={(e) => editarPodcast(item)}
                              >
                                <FaPen size={18} />
                              </button>
                              <button
                                className="button delete"
                                onClick={(e) => deletarPodcast(item)}
                              >
                                <FaTimes size={18} />
                              </button>
                            </div>
                          </PodcastList>
                        ))}
                  </ul>

                  <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={editarPod}
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                  >
                    <Row lg="12" className="mb-3">
                      <Col lg="6" xs="12">
                        {preview ? (
                          <div lg="12" xs="12" style={{ height: "100%" }}>
                            <MdClose
                              size={30}
                              color={"#fff"}
                              className="closeIcon"
                              onClick={() => deletePreview()}
                            />
                            <img
                              style={{
                                maxHeight: 400,
                                height: "100%",
                                width: "100%",
                                borderRadius: 15,
                              }}
                              src={preview}
                            />
                          </div>
                        ) : (
                          <input
                            type="file"
                            style={{ minHeight: 400 }}
                            name="pod_endereco_img"
                            type="file"
                            id="pod_endereco_img"
                            accept="image/*"
                            data-file={file}
                            onChange={(event) => getFile(event.target.files[0])}
                          />
                        )}
                      </Col>

                      <Col lg="6" xs="12" className="borderBottom">
                        <h5 style={{ color: "#fff" }}>Nome do podcast</h5>
                        <Input
                          name="pod_nome"
                          type="text"
                          placeholder="Nome do Podcast"
                        />

                        <h5 style={{ color: "#fff" }}>
                          Escolha até 5 categorias
                        </h5>

                        {true && (
                          <ul id="tags" className="borderBottom">
                            {allCategorias
                              .filter((obj) => !selectCategorias.includes(obj))
                              .map((cat) => {
                                console.log("CAT ->", selectCategorias);

                                return (
                                  <li key={cat.ctg_id} className="tag">
                                    <span className="tag-title">
                                      {cat.ctg_descricao}
                                    </span>
                                    <span
                                      className="tag-close-icon"
                                      onClick={() => setCategoria(cat)}
                                    >
                                      +
                                    </span>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                        <h5 style={{ color: "#fff" }}>
                          Categorias selecionadas
                        </h5>
                        <ul id="tags">
                          {allCategorias
                            .filter((obj) => selectCategorias.includes(obj))
                            .map((cat) => (
                              <>
                                <br />
                                <li key={cat.id} className="tag">
                                  <span className="tag-title">
                                    {cat.ctg_descricao}
                                  </span>
                                  <span
                                    className="tag-close-icon"
                                    onClick={() => removeCategoria(cat)}
                                  >
                                    x
                                  </span>
                                </li>
                              </>
                            ))}
                        </ul>
                      </Col>
                    </Row>

                    <Row className="borderBottom">
                      <Col lg="12" xs="12">
                        <h5 style={{ color: "#fff" }}>Descrição</h5>
                        <Textarea
                          name="pod_descricao"
                          type="text"
                          placeholder="Descrição do Podcast"
                          style={{ minHeight: 200 }}
                        />
                      </Col>
                    </Row>

                    <Row lg="12" className="borderBottom">
                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Ano de criação</h5>
                        <Input
                          name="pod_anocriacao"
                          type="text"
                          placeholder="Ano de criação"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Nome do criador</h5>
                        <Input
                          name="pod_criador"
                          type="text"
                          placeholder="Nome do criador"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Média de duração</h5>
                        <Input
                          name="pod_duracao"
                          type="text"
                          placeholder="Média de duração em minutos"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 1</h5>
                        <Input
                          name="end_link1"
                          type="text"
                          placeholder="Endereço 1 do Podcast"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 2</h5>
                        <Input
                          name="end_link2"
                          type="text"
                          placeholder="Endereço 2 do Podcast"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 3</h5>
                        <Input
                          name="end_link3"
                          type="text"
                          placeholder="Endereço 3 do Podcast"
                        />
                      </Col>
                    </Row>

                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Salvar Alterações
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
