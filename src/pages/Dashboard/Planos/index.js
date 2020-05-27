import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Input from "../../../components/Input";
import PodcastList from "../../../styles/ItemList";
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

export default function Planos() {
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);
  const [planos, setPlanos] = useState([]);
  const [editPlano, setEditPlano] = useState([]);
  const [searchValue, setSearch] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    exibirPlanos();

    
  }, [editMode]);

  async function exibirPlanos() {
    const response = await api.get("/planos");
    console.log(response.data);
    setPlanos(response.data);
  }

  async function editarPlano(plano) {
    setEditMode(true);
    setEditPlano(plano);
  }

  async function handleSubmit({ pln_preco }) {
    const planoid = editPlano.pln_id;

    try {
      api.put(`plano/${planoid}`, { pln_preco });
      toast.success("Plano editado.");
      setEditMode(false);
      setUpdate(update ? false : true);
    } catch (err) {
      toast.error("Não foi possível editar o plano.");
    }
  }

  return (
    <>
      {console.log(planos)}
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
                  ></Row>
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    {editMode ? `Editar Plano` : `${planos.length} Planos`}
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
                    {planos.map((item) => (
                      <PodcastList>
                        <div className="item">
                          <Link
                            className="linktittle"
                            style={{ color: "#1bfdbe", fontWeight: "bold" }}
                          >
                            {item.pln_descricao} {" - "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(item.pln_preco)}
                          </Link>
                        </div>
                        <div className="icons">
                          <button
                            className="button edit"
                            onClick={(e) => editarPlano(item)}
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
                    initialData={editPlano}
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                  >
                    <Input
                      name="pln_preco"
                      type="value"
                      placeholder="valor do plano"
                    />

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
