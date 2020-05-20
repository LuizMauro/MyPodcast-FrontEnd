import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../services/api";
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
  const [podcasts, setPodcasts] = useState([]);
  const [dados, setDados] = useState([]);

  useEffect(() => {
    let podinicial = null;

    async function exibirPodcasts() {
      const response = await api.get("/userpodcasts");
      setPodcasts(response.data);
      if (response.data.length > 0) {
        podinicial = response.data[0].pod_id;
        loadEstatistica();
      }
    }

    async function loadEstatistica() {
      const response = await api.get(`/estatisticaspremium/${podinicial}`);
      setDados(response.data);
    }

    exibirPodcasts();
    loadEstatistica();
  }, []);

  async function SelecionarPodcast() {}

  return (
    <>
      {console.log("dados", dados)}
      {console.log("pods", podcasts)}
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
                    <Col lg="6">
                      <select
                        className="select-home shadow"
                        onChange={SelecionarPodcast}
                        value={podcasts}
                        style={{ color: "#fff", width: "100%" }}
                        type="select"
                        name="select"
                        id="exampleSelect"
                      >
                        {podcasts.map((item) => (
                          <option value={item.pod_id}>{item.pod_nome}</option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="3" sm="6">ABC</Col>
                    <Col lg="3" sm="6">DEF</Col>
                    <Col lg="3" sm="6">GHI</Col>
                    <Col lg="3" sm="6">JKL</Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="6" md="12">ABC</Col>
                    <Col lg="6" md="12">ABC</Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="12">123</Col>
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
