import React, { useEffect, useRef, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import api from "../../services/api";
import { FaSpotify, FaInternetExplorer, FaYoutube } from "react-icons/fa";
import Lottie from "react-lottie";
import { Form } from "@unform/web";
import { useDispatch } from "react-redux";
import { createComentarioRequest } from "../../store/modules/comentario/actions";
import Textarea from "../../components/Textarea";
import * as animationData from "../../assets/animations/like.json";
import { toast } from "react-toastify";
import history from "../../services/history";
import publicIp from "react-public-ip";
import "./style.css";

import { useSelector } from "react-redux";
import Comentario from "../../components/Comentarios";
// reactstrap components
import { Container, Col, Button } from "reactstrap";

import firebase from "../../config/firebaseConfig";

export default function Podcast() {
  const database = firebase.database();
  const { pod_id } = useParams();
  const [podcast, setPodcast] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [acompnhamento, setAcompanhamento] = useState([]);
  const [favorito, setFavoritar] = useState([]);
  const [nota, setNota] = useState(null);
  const [media, setMedia] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [update, setUpdate] = useState(true);

  const profile = useSelector((state) => state.user.profile);

  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(1);
  let limit = 5;

  useEffect(() => {
    loadPodcast({});
    loadComentarios({});
    view({});
  }, [update, pod_id, profile, currentPage]);

  async function loadPodcast() {
    const response = await api.get(`/podcast/${pod_id}`);
    console.log(response.data);
    if (!response.data) {
      history.push("/error");
    } else {
      setPodcast(response.data);

      //Busca média do podcast
      const valor_media = await api.get(`${pod_id}/medianota`);
      setMedia(valor_media.data);

      //Busca nota que usuário já deu (Se ele deu)
      if (profile) {
        const verifica = await api.get(`${pod_id}/avaliar`);
        if (verifica.data.fbk_status === 1) {
          //se caiu aqui ele já deu uma nota e vai exibir
          setNota(verifica.data.fbk_valor);
        }
      }

      const { ctg_descricao, end_link } = response.data;
      setCategoria(ctg_descricao.split(","));
      setEndereco(end_link.split(","));
    }
    setaCheckBox();
    setaFavoritar();
  }

  async function view() {
    const ipv4 = (await publicIp.v4()) || "";
    const ipv6 = (await publicIp.v6()) || "";

    if (profile) {
      await api.post(`/podview/${pod_id}`);
    } else {
      await api.post(`/podview/${pod_id}/${ipv4 ? ipv4 : ipv6}`);
    }
  }

  //PAGINACAO DE COMENTARIOS
  async function loadComentarios() {
    const response = await api.get(`allcomentarios/${pod_id}`);
    setComentarios(response.data);

    const comments = response.data.filter(item => !item.id_comentario_pai);

    if (comments.length <= limit) {
      setLoadMore(0);
    } else if (comments.length > limit * currentPage) {
      setLoadMore(1);
    } else {
      setLoadMore(2);
    }
  }

  async function load() {
    if (loadMore === 1) {
      setCurrentPage(currentPage + 1);
    } else if (loadMore === 2) {
      setCurrentPage(currentPage - 1);
    }
  }
  //FIM PAGINACAO DE COMENTARIOS

  async function setaCheckBox() {
    const acompanhandoResp = await api.get(`acompanhando/${pod_id}`);

    setAcompanhamento(acompanhandoResp.data);
  }

  async function setaFavoritar() {
    const verifica = await api.get(`findfavorito/${pod_id}`);
    setFavoritar(verifica.data);
  }

  async function favoritar() {
    if (profile) {
      const verifica = await api.get(`findfavorito/${pod_id}`);

      if (verifica.data.fbk_status === 1) {
        await api.put(`profile/favoritar/${pod_id}`);

        toast.success(`Você desfavoritou ${podcast.pod_nome}`);
      } else {
        await api.post(`${pod_id}/favoritar`);
        createNotification();
        toast.success(`Você favoritou ${podcast.pod_nome}`);
      }
    } else {
      toast.error("Você precisa estar lagado para fazer essa ação");
      history.push("/login");
      console.log("n ta logado n pode favorita ");
    }
    setaFavoritar();
  }

  async function marcarPodcast(e) {
    if (profile) {
      const verifica = await api.get(`acompanhando/${pod_id}`);
      console.log("status é", verifica.data.fbk_status);

      if (verifica.data.fbk_status === 0) {
        //Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
        await api.put(`acompanhando/${pod_id}/${e}`);
      } else if (verifica.data.fbk_status === 1) {
        //Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
        await api.put(`acompanhando/${pod_id}/${e}`);
        createNotificationAcompanhando();
      } else if (verifica.data.fbk_status === 2) {
        //Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
        await api.put(`acompanhando/${pod_id}/${e}`);
        createNotificationMarcarPretendoAcompanhar();
      } else if (!verifica.data.fbk_status) {
        //Se não marcou ainda, marca podcast por aqui pelo status vindo do botao

        if (e === 1) {
          // Marcar como acompanhando
          await api.post(`${pod_id}/acompanhando`);
          createNotificationAcompanhando();
        } else if (e === 2) {
          // Marcar como pretendo acompanhar
          await api.post(`${pod_id}/acompanhar`);
          createNotificationMarcarPretendoAcompanhar();
        } else {
          toast.error("Você não pode escolher essa opção");
          console.log("nao tem como marcar como nao marcado");
        }
      }

      if (e === 0) {
        toast.success(`Você parou de acompanhar ${podcast.pod_nome}`);
      } else if (e === 1) {
        toast.success(`Você marcou ${podcast.pod_nome} como "Acompanhando"`);
      } else {
        toast.success(`Você marcou ${podcast.pod_nome} como "Pretendo Acompanhar"`);
      }

      setaCheckBox();

      console.log(e);
    } else {
      toast.error("Você precisa logar para fazer essa ação");
      history.push("/login");
    }
  }

  async function avaliarPodcast(e) {
    setNota(e.target.value);
    const valor = e.target.value;
    console.log("a nota é ", valor);

    if (profile) {
      const verifica = await api.get(`${pod_id}/avaliar`);

      if (verifica.data.fbk_status === 0 || verifica.data.fbk_status === 1) {
        //Se caiu aqui é porque removeu nota e vai colocar de novo ou tá mudando a nota

        if (valor >= 1) {
          await api.put(`${pod_id}/avaliar/${valor}/1`);
        } else {
          await api.put(`${pod_id}/avaliar/${valor}/0`);
        }
      } else if (!verifica.data.fbk_status) {
        //se caiu aqui nao deu nota ainda e vai criar
        console.log("ej", !verifica.data.fbk_status);
        if (valor >= 1) {
          // Marcar como acompanhando
          await api.post(`${pod_id}/avaliar/${valor}`);
        } else {
          toast.error("Opção inválida");
          console.log("nao tem como marcar como tirar a nota");
        }
      }

      if (valor === 0) {
        const valor_media = await api.get(`${pod_id}/medianota`);
        setMedia(valor_media.data);
        toast.success(`Você removeu sua nota`);
      }
      if (valor >= 1) {
        const valor_media = await api.get(`${pod_id}/medianota`);
        setMedia(valor_media.data);

        toast.success(`Você avaliou com nota ` + valor + ".0");
      }
    } else {
      toast.error("Você precisa logar para fazer essa ação");
      history.push("/login");
    }
  }

  async function handleComentario({ cmt_conteudo }) {
    if (profile) {
      setUpdate(update ? false : true);
      createNotificationComment();
      dispatch(createComentarioRequest(cmt_conteudo, podcast.pod_id, 1));
      formRef.current.reset();
    } else {
      toast.error("Você precisa entrar para realizar esta ação");
      history.push("/cadastro");
    }
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  function createNotification() {
      
    
    if (podcast.usu_id !== profile.usu_id) {
      database.ref(`notifications/` + podcast.usu_id).push({
        title: `${profile.usu_nome} favoritou seu podcast ${podcast.pod_nome}`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
      });
    }
  }

  function createNotificationComment() {
    if (podcast.usu_id !== profile.usu_id) {
      database.ref(`notifications/` + podcast.usu_id).push({
        title: `${profile.usu_nome} comentou no seu podcast ${podcast.pod_nome}`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
        
      });
    }
  }

  function createNotificationAcompanhando() {
    if (podcast.usu_id !== profile.usu_id) {
      database.ref(`notifications/` + podcast.usu_id).push({
        title: `${profile.usu_nome} marcou ${podcast.pod_nome} como "Acompanhando"`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
      });
    }
  }

  function createNotificationMarcarPretendoAcompanhar() {
    if (podcast.usu_id !== profile.usu_id) {
      database.ref(`notifications/` + podcast.usu_id).push({
        title: `${profile.usu_nome} marcou ${podcast.pod_nome}  como "Pretendo Acompanhar"`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
       
      });
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <div
          className="bg-secondary shadow"
          style={{
            marginTop: "5%",
            display: "flex",
            flexWrap: "wrap",
            marginBottom: 50,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              height: "auto",
              minWidth: 300,
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
            }}
          >
            <div className="img" style={{ padding: 20 }}>
              <img
                alt="avatar"
                className="shadow podcast-image"
                src={`http://localhost:3333/files/${podcast.pod_endereco_img}`}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "30px",
              }}
            >
              <h2 style={{ color: "#fff" }}>
                Nota:{" "}
                {media.pod_media ? parseInt(media.pod_media).toFixed(2) : "N/A"}
              </h2>
            </div>

            <div style={{ display: "flex" }}>
              {favorito.fbk_status !== 1 ? (
                <i onClick={() => favoritar()}>
                  <Lottie
                    style={{ marginTop: -25, marginBottom: -20 }}
                    options={defaultOptions}
                    height={100}
                    width={100}
                    speed={2}
                    direction={-3}
                  />
                </i>
              ) : (
                <i onClick={() => favoritar()}>
                  <Lottie
                    style={{ marginTop: -25, marginBottom: -20 }}
                    options={defaultOptions}
                    height={100}
                    width={100}
                  />
                </i>
              )}

              <select
                className="select-home shadow"
                onChange={avaliarPodcast}
                value={nota}
                style={{ color: "#fff", width: "70%" }}
                type="select"
                name="select"
                id="exampleSelect"
              >
                <option value="0">Dar uma nota</option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div
              style={{ padding: 2, display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <label className="custom-toggle" style={{ marginRight: 20 }}>
                  <input
                    type="checkbox"
                    checked={acompnhamento.fbk_status === 1 ? true : false}
                    onChange={(e) => marcarPodcast(1)}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
                <h4 style={{ width: 250, color: "#fff" }}>Acompanhando</h4>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <label className="custom-toggle" style={{ marginRight: 20 }}>
                  <input
                    type="checkbox"
                    checked={acompnhamento.fbk_status === 2 ? true : false}
                    onChange={(e) => marcarPodcast(2)}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
                <h4 style={{ width: 250, color: "#fff" }}>
                  Pretendo acompanhar
                </h4>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <label className="custom-toggle" style={{ marginRight: 20 }}>
                  <input
                    type="checkbox"
                    checked={acompnhamento.fbk_status === 0 ? true : false}
                    onChange={(e) => marcarPodcast(0)}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
                <h4 style={{ width: 250, color: "#fff" }}>Não acompanhar</h4>
              </div>
            </div>
          </div>
          <div
            style={{
              minWidth: 300,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1 }} className="borderBottom p-3">
              <h2 style={{ color: "#fff", marginTop: 20 }}>
                <strong>{podcast.pod_nome}</strong>
              </h2>
            </div>

            <div
              style={{ height: "auto", flex: 1 }}
              className="borderBottom p-3"
            >
              <h5 style={{ color: "#fff" }}>
                <strong>Categorias</strong>
              </h5>
              <div
                className="categorias-wrapper"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {categoria.map((cat) => (
                  <div
                    style={{
                      padding: 5,
                      margin: 5,
                      backgroundColor: "#212454",
                      borderRadius: 5,
                      color: "#fff",
                    }}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }} className="borderBottom p-3">
              <p style={{ color: "#fff", textAlign: "justify" }}>
                {podcast.pod_descricao}
              </p>
            </div>

            <div
              style={{ flex: 1, display: "flex" }}
              className="borderBottom info-podcast"
            >
              <div
                style={{
                  margin: 20,
                  borderRadius: 5,
                  color: "#fff",
                }}
              >
                <h5 style={{ color: "#fff" }}>
                  <strong>Ano de criação</strong>
                </h5>
                <p>{podcast.pod_anocriacao}</p>
              </div>
              <div
                style={{
                  margin: 20,
                  borderRadius: 5,
                  color: "#fff",
                }}
              >
                <h5 style={{ color: "#fff" }}>
                  <strong>Podcaster</strong>
                </h5>
                <p>{podcast.pod_criador}</p>
              </div>
              <div
                style={{
                  margin: 20,
                  borderRadius: 5,
                  color: "#fff",
                }}
              >
                <h5 style={{ color: "#fff" }}>
                  <strong>Média de Duração</strong>
                </h5>
                <p>{podcast.pod_duracao}min</p>
              </div>
            </div>

            <div className="p-3" style={{ height: "auto", flex: 1 }}>
              <h5 style={{ color: "#fff" }}>Disponivel em</h5>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {endereco.map(
                  (item) =>
                    item.includes(".com") && (
                      <div style={{ padding: 5, margin: 5 }}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item}
                        >
                          {item.includes("spotify.com") ? (
                            <FaSpotify style={{ color: "#1DB954	" }} size={50} />
                          ) : item.includes("youtube.com") ? (
                            <FaYoutube style={{ color: "ff0000" }} size={50} />
                          ) : (
                            <FaInternetExplorer
                              style={{ color: "#0f7aca" }}
                              size={50}
                            />
                          )}
                        </a>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        <h2 style={{ color: "#fff", fontWeight: "bold" }}>{comentarios.length} Comentários</h2>
        <div
          className="bg-secondary shadow"
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            marginBottom: 50,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 20,
              paddingBottom: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                padding: 5,
                height: 50,
                marginBottom: 10,
              }}
            >
              {profile && (
                <div style={{ width: 50, height: 50 }}>
                  <img
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    src={
                      "https://api.adorable.io/avatars/285/" + profile.usu_nome
                    }
                  />
                </div>
              )}
              <div
                style={{
                  width: "40%",
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 20,
                }}
              >
                <p style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                  {profile !== null
                    ? profile.usu_nome
                    : "Faça login para comentar."}
                </p>
              </div>
            </div>
            <Form ref={formRef} onSubmit={handleComentario}>
              <Textarea
                name="cmt_conteudo"
                placeholder="Digite um comentário"
                type="text"
                required
              ></Textarea>
              <div className="text-right" style={{ marginTop: 10 }}>
                <Button type="submit" color="primary">
                  Comentar
                </Button>
              </div>
            </Form>
          </div>
          {/* lista comentarios */}
          <Comentario
            data={comentarios.map((item) => item)}
            profile={profile}
            podcast={podcast}
            setUpdate={setUpdate}
            update={update}
            limit={limit}
            currentPage={currentPage}
          />
          <Col
            lg="12"
            sm="12"
            className="mb-3 mt-3"
            style={
              loadMore === 0 ? { display: "none" } : { textAlign: "center" }
            }
          >
            <Button className="btn-primary" onClick={load}>
              {loadMore === 1 ? `Mostrar Mais` : `Mostrar Menos`}
            </Button>
          </Col>
        </div>
      </Container>
    </>
  );
}
