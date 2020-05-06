import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

export default function Home() {
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    exibirUsuarios();
    //console.log(`Teste`)
  }, []);

  async function exibirUsuarios() {
    const response = await api.get("/users");
    console.log("users", response.data);
    setUsuario(response.data);
}

  return (
    <section className="section section-shaped section-lg">
      <Container className="pt-lg-1">
        <Row style={{ justifyContent: "center" }}>
          <Col lg="12">
            <Card className="bg-secondary shadow border-0">
              <CardBody
                className="px-lg-5 py-lg-5"
                enctype="multipart/form-data"
              >
                <CardTitle>Usuários do Sistema</CardTitle>
                <Row className="mt-1">
                  <h1>{usuario.length}</h1>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
