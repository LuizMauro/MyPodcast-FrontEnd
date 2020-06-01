import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import Input from "../../../../components/Input";
import PodcastList from "../../../../styles/ItemList";
import { FaPen, FaTimes, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import pt from "date-fns/locale/pt";
import { DateRange} from "react-date-range";

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
  const [publicidades, setPublicidades] = useState([]);
  const [editarPub, setEditarPub] = useState([]);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: "",
      key: "selection",
    },
  ]);

  useEffect(() => {
    exibirPublicidades();
  }, [publicidades, editMode]);

  function getFile(file) {
    setPreview(URL.createObjectURL(file));
    setFile(file);
  }

  function deletePreview() {
    setPreview(null);
    setFile(null);
  }

  async function exibirPublicidades() {
    const response = await api.get("/publicidades");
    console.log(response.data);
    setPublicidades(response.data);
  }

  async function editarPublicidade(publicidade) {
    setPreview(`http://localhost:3333/files/${publicidade.pub_endereco_img}`);
    setEditMode(true);
    setEditarPub(publicidade);
  }

  async function handleSubmit({ pub_descricao, pub_link }) {
    if (!state[0].endDate) {
      toast.error("Escolha uma data");

      return;
    }

    const pubid = editarPub.pub_id;
    const dateTime = state[0].endDate.toISOString();
    const adata = dateTime.replace(
      /^(\d{4})-(\d{2})-(\d{2})\T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/,
      "$1-$2-$3 $4:$5:$6"
    );

    if (!preview) {
      toast.error("Imagem obrigatória");
    }
    console.log("o file", file);

    if (file) {
      if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        toast.error("Imagem deve ser PNG/JPG/JPEG");
        return;
      }
    }

    try {
      const schema = Yup.object().shape({
        pub_descricao: Yup.string().required("A descrição é obrigatória"),
        pub_link: Yup.string().required("O link é obrigatório"),
      });

      await schema.validate(
        { pub_descricao, pub_link },
        {
          abortEarly: false,
        }
      );

      const data = new FormData();
      data.append("pub_descricao", pub_descricao);
      data.append("pub_data_fim", adata);
      data.append("pub_link", pub_link);
      data.append("file", file);

      api.put(`/publicidade/${pubid}`, data);
      toast.success("Publicidade editada!");
      setEditMode(false);

      formRef.current.setErrors(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        toast.error("Erro ao editar publicidade");
        console.log(errorMessages);

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  async function deletarPublicidade(publicidade) {}

  function searchPublicidade(e) {
    setSearch(e.target.value);

    setListSearch(
      publicidades.filter(({ pub_descricao }) =>
        pub_descricao.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      {console.log(publicidades)}
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
                          placeholder="Buscar publicidade"
                          type="text"
                          onChange={(e) => searchPublicidade(e)}
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
                        to="publicidade/cadastrar"
                      >
                        <FaPlus size={18} /> Publicidade
                      </Link>
                    </Col>
                  </Row>
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    {editMode
                      ? `Editar Publicidade`
                      : `${publicidades.length} Publicidades cadastradas`}
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
                      ? publicidades.map((item) => (
                          <PodcastList>
                            <div className="item">
                              <Link
                                to={`../../../podcast/${item.ctg_id}`}
                                className="linktittle"
                                style={{ color: "#1bfdbe", fontWeight: "bold" }}
                              >
                                {item.pub_descricao}
                              </Link>
                            </div>
                            <div className="icons">
                              <button
                                className="button edit"
                                onClick={(e) => editarPublicidade(item)}
                              >
                                <FaPen size={18} />
                              </button>
                              <button
                                className="button delete"
                                onClick={(e) => deletarPublicidade(item)}
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
                                onClick={(e) => editarPublicidade(item)}
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
                    initialData={editarPub}
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                  >
                    <Row lg="12">
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
                              alt="avatar"
                            />
                          </div>
                        ) : (
                          <input
                            type="file"
                            style={{ minHeight: 400 }}
                            name="pub_endereco_img"
                            type="file"
                            id="pub_endereco_img"
                            accept="image/*"
                            data-file={file}
                            onChange={(event) => getFile(event.target.files[0])}
                          />
                        )}
                      </Col>
                      <Col lg="6">
                        <Input
                          name="pub_descricao"
                          type="text"
                          placeholder="Descrição da Publicidade"
                        />

                        <Input
                          name="pub_link"
                          type="text"
                          placeholder="Site da publicidade"
                          className="mt-5"
                        />

                        {console.log(state)}

                        <DateRange
                          className="shadow"
                          editableDateInputs={true}
                          onChange={(item) => setState([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                          minDate={new Date()}
                          startDate={new Date()}
                          locale={pt}
                          color="#fff"
                          theme={{ color: "#fff" }}
                          rangeColors="#69deac"
                        />
                      </Col>
                    </Row>

                    <div className="text-center mt-5">
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
