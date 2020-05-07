import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";


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
                  <Col lg="6">
                    <p>Buscar</p>
                  </Col>
                  <Col lg="6" style={{ textAlign: "end" }}>
                    <Link className="btn btn-primary" to="podcasts/cadastrar">
                     
                    </Link>
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
