import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";


import {
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Footer() {
  return (
    <>
      <div className="bg-dark text-grey pt-4 mt-10">
        <Container className="text-center text-md-left">
          <Row>
            <Col md-4>
              <h5 className="text-white">Sobre</h5>
              <p className="mt-4">O MyPodcast é uma plataforma para listar, categorizar e exibir informações sobre podcasts dos mais diversos temas. Se você for um criador dessa mídia, cadastre-se e registre seu podcast para que outras pessoas o encontrem em nosso sistema.</p>
            </Col>
            <Col md-4>
              <h5 className="text-white">Contato</h5>
              <ul className="mt-4">
                <li className="list-unstyled mb-3">
                  <a href="#!">Fatec Guaratinguetá</a>
                </li>
                <li className="list-unstyled mb-3">
                  <a href="#!">mypodcastcontato@gmail.com</a>
                </li>
                <li className="list-unstyled mb-3">
                  <a href="#!">(12) 34567788</a>
                </li>
              </ul>
            </Col>
            <Col md-4>
              <h5 className="text-white">Siga-nos</h5>
              <container className="d-flex mt-4">
                <a href="#" className="flex-fill">
                  <FaFacebook size='28px'/>
                </a>
                <a href="#" className="flex-fill">
                  <FaTwitter size='28px'/>
                </a>
                <a href="#" className="flex-fill">
                  <FaYoutube size='28px'/>
                </a>
                <a href="#" className="flex-fill">
                  <FaInstagram size='28px'/>
                </a>
              </container>
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
