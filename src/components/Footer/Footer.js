import React from "react";

import { Link } from "react-router-dom";

import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

export default function Footer() {
  return (
    <>
      <div className="bg-dark text-white pt-4 mt-10">
        <Container className="text-center text-md-left">
          <Row>
            <Col md-4>
              <h5>Sobre</h5>
              <p>O MyPodcast é uma plataforma para listar, categorizar e exibir informações sobre podcasts dos mais diversos temas. Se você for um criador dessa mídia, cadastre-se e registre seu podcast para que outras pessoas o encontrem em nosso sistema.</p>
            </Col>
            <Col md-4>
              <h5>Contato</h5>
              <ul>
                <li className="list-unstyled">
                  <a href="#!">Fatec Guaratinguetá</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">mypodcastcontato@gmail.com</a>
                </li>
                <li className="list-unstyled">
                  <a href="#!">12 34567788</a>
                </li>
              </ul>
            </Col>
            <Col md-4>
              <h5>Siga-nos</h5>
              <p></p>
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mypodcast.com"> MyPodcast.com </a>
          </Container>
        </div>
      </div>
    </>
  );
}
