import React from "react";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Button, Container, Row, Col } from "reactstrap";

export default function Footer() {
  return (
    <>
      <div className="bg-default pt-3 text-grey">
        <Container className="text-center text-md-left">
          <Row>
            <Col md-4>
              <h5 className="logo-title">Sobre</h5>
              <p className="mt-4 text-white text-justify">
                O MyPodcast é uma plataforma para listar, categorizar e exibir
                informações sobre podcasts dos mais diversos temas. Se você for
                um criador dessa mídia, cadastre-se e registre seu podcast para
                que outras pessoas o encontrem em nosso sistema.
              </p>
              <Link
                to="/SiteMap"
                className="d-flex mt-2 logo-title font-weight-bold"
                style={{ justifyContent: "justify" }}
              >
                Mapa do Site
              </Link>
            </Col>
            <Col md-4 className="text-center">
              <h5 className="logo-title">Contato</h5>
              <ul className="mt-4">
                <li className="list-unstyled mb-3">
                  <span className="text-white">Fatec Guaratinguetá</span>
                </li>
                <li className="list-unstyled mb-3">
                <span className="text-white">mypodcastcontato@gmail.com</span>
                </li>
                <li className="list-unstyled mb-3">
                <span className="text-white">(12) 34567788</span>
                </li>
              </ul>
            </Col>
            <Col md-4>
              <h5 className="logo-title">Siga-nos</h5>
              <container className="d-flex mt-4">
                <a href="#" className="flex-fill">
                  <FaFacebook size="28px" color="#1BFDBE"/>
                </a>
                <a href="#" className="flex-fill">
                  <FaTwitter size="28px" color="#1BFDBE"/>
                </a>
                <a href="#" className="flex-fill">
                  <FaYoutube size="28px" color="#1BFDBE" />
                </a>
                <a href="#" className="flex-fill">
                  <FaInstagram size="28px" color="#1BFDBE"/>
                </a>
              </container>
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid className="text-white">
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.mypodcast.com" className="font-weight-bold logo-title"> MyPodcast.com </a>
          </Container>
        </div>
      </div>
    </>
  );
}
