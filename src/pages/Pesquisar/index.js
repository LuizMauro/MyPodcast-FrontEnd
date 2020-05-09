import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "../../components/Menu/index";

import api from "../../services/api";

import { Container } from "reactstrap";

export default function Pesquisar() {
  const [podcasts, setPodcasts] = useState([]);
  let cate = [];
  let query = new URLSearchParams(useLocation().search);
  const select = query.get("select");

  async function loadPodCastsAll() {
    const response = await api.get("/allpodcasts");
    setPodcasts(response.data);
  }

  async function loadPodCastsCategoria(select) {
    const response = await api.get(`/pesquisar/${select}`);
    setPodcasts(response.data);
  }

  async function loadPodCastsNome(pesquisa) {
    const response = await api.get(`/pesquisarnome/${pesquisa}`);
    setPodcasts(response.data);
  }

  async function loadPodCastsCategoriaAndNome(select, pesquisa) {
    const response = await api.get(`/pesquisar/nome/${select}/${pesquisa}`);  

    setPodcasts(response.data);
  }

  useEffect(() => {
    const select = query.get("select");
    const pesquisa = query.get("pesquisa");

    if (select === "" && pesquisa === "") {
      loadPodCastsAll();
    } else if (select === "" && pesquisa !== "") {
      
      loadPodCastsNome(pesquisa);
    } else if (select !== "" && pesquisa === "") {
      loadPodCastsCategoria(select);
    } else if (select !== "" && pesquisa !== "") {
      loadPodCastsCategoriaAndNome(select, pesquisa);
    }
  }, []);

  return (
    <>
      <Menu />
      <section className="section section-shaped">
        <Container className="pt-lg-1">
          <p className="h2 p mt-3">{podcasts.length} Resultados encontrados</p>
          {!select && <p className="h4 p">Todas as categorias</p>}

          <ul
            className="py-2"
            style={{
              flexWrap: "wrap",
              boxSizing: "border-box",
              display: "grid",
              placeContent: "center",
              gridGap: ".75em 2.5em",
              gridTemplateColumns: "repeat(auto-fit, 13em)",
              margin: 0,
              padding: 0,
            }}
          >
            {podcasts.map((item) => (
              <li
                className="custom-card mb-3 flex-column"
                style={{ display: "flex", flex: "auto", minWidth: "200px" }}
                key={item.pod_id}
              >
                <Link
                  to={`podcast/${item.pod_id}`}
                  style={{
                    maxWidth: "100px",
                    alignSelf: "center",
                    marginTop: 10,
                  }}
                >
                  <img
                    src={`http://localhost:3333/files/${item.pod_endereco_img}`}
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    className="img-thumb"
                    alt={item.pod_nome}
                  />
                </Link>
                <div style={{ flex: 1 }}>
                  <Link
                    to={`podcast/${item.pod_id}`}
                    style={{ textAlign: "center" }}
                  >
                    <p
                      style={{
                        fontSize: "1rem",
                        marginBottom: 0,
                        fontFamily: "inherit",
                        fontWeight: 500,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.pod_nome}
                    </p>
                  </Link>
                  <div style={{ display: "none" }}>
                    {(cate = item.ctg_descricao.split(","))}
                    {}
                  </div>
                  <div
                    style={{
                      flexWrap: "wrap",
                      display: "grid",
                      placeContent: "center",
                      gridGap: ".75em",
                      gridTemplateColumns: "repeat(2, em)",
                      margin: 0,
                      padding: 0,
                      marginTop: 10,
                    }}
                  >
                    {cate.map((cat) => (
                      <span className="badge bg-green m-2">{cat}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
