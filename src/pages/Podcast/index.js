import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

import { useSelector } from "react-redux";
import Comentario from "../../components/Comentarios";
// reactstrap components
import { Container, Button } from "reactstrap";

export default function Podcast() {
  const { pod_id } = useParams();
  const [podcast, setPodcast] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [endereco, setEndereco] = useState([]);
  const [opcao, setOpcao] = useState("");
  const [acompnhamento, setAcompanhamento] = useState([]);
  const [favorito, setFavoritar] = useState([]);
  const [nota, setNota] = useState(null);
  const [media, setMedia] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [update, setUpdate] = useState(true);

  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    async function loadPodcast() {
      const response = await api.get(`/podcast/${pod_id}`);
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

      const comments = await api.get(`allcomentarios/${pod_id}`);
      setComentarios(comments.data);

      const { ctg_descricao, end_link } = response.data;
      setCategoria(ctg_descricao.split(","));
      setEndereco(end_link.split(","));

      setaCheckBox();
      setaFavoritar();
    }

    loadPodcast();
  }, [update]);

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
      } else if (verifica.data.fbk_status === 2) {
        //Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
        await api.put(`acompanhando/${pod_id}/${e}`);
      } else if (!verifica.data.fbk_status) {
        //Se não marcou ainda, marca podcast por aqui pelo status vindo do botao

        if (e === 1) {
          // Marcar como acompanhando
          await api.post(`${pod_id}/acompanhando`);
        } else if (e === 2) {
          // Marcar como pretendo acompanhar
          await api.post(`${pod_id}/acompanhar`);
        } else {
          toast.error("Você não pode escolher essa opção");
          console.log("nao tem como marcar como nao marcado");
        }
      }

      if (e === 0) {
        toast.success(`Você parou de acompanhar ${podcast.pod_nome}`);
      } else if (e === 1) {
        toast.success(`Você começou a acompanhar ${podcast.pod_nome}`);
      } else {
        toast.success(`Você pretende acompanhar ${podcast.pod_nome}`);
      }

      setaCheckBox();
      setOpcao(e);
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

      if (valor == 0) {
        toast.success(`Você removeu sua nota`);
      }
      if (valor >= 1) {
        toast.success(`Você avaliou o podcast`);
      }
    } else {
      toast.error("Você precisa logar para fazer essa ação");
      history.push("/login");
    }
  }

  async function handleComentario({ cmt_conteudo }) {
    setUpdate(true ? false : true)
    dispatch(
      createComentarioRequest(cmt_conteudo, podcast.pod_id, profile.usu_id)
    );
  }

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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
            }}
          >
            <div
              style={{ height: 350, width: 400, padding: 20 }}
              className="borderBottom"
            >
              <img
                className="shadow"
                width="100%"
                height="100%"
                style={{ borderRadius: 10 }}
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
                <a onClick={() => favoritar()}>
                  <Lottie
                    style={{ marginTop: -25, marginBottom: -20 }}
                    options={defaultOptions}
                    height={100}
                    width={100}
                    speed={2}
                    direction={-3}
                  />
                </a>
              ) : (
                <a onClick={() => favoritar()}>
                  <Lottie
                    style={{ marginTop: -25, marginBottom: -20 }}
                    options={defaultOptions}
                    height={100}
                    width={100}
                  />
                </a>
              )}

              <select
                style={{
                  marginTop: 5,
                  width: "100%",
                  height: "40px",
                  padding: 0,
                }}
                onChange={avaliarPodcast}
                value={nota}
                className="select-home shadow"
                style={{ color: "#fff" }}
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
                <h4 style={{ width: 250, color: "#fff" }}>Acompanhar</h4>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
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

            <div style={{ flex: 1, display: "flex" }} className="borderBottom">
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
                        <a target="_blank" href={item}>
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

        <h2 style={{ color: "#fff", fontWeight: "bold" }}>Comentários</h2>
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
              <div style={{ width: 50, height: 50 }}>
                {profile && (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    src={
                      "https://api.adorable.io/avatars/285/" + profile.usu_email
                    }
                  />
                )}
              </div>
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
                  {profile !== null ? profile.usu_nome : "Não logado"}
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
          />
        </div>
      </Container>
    </>
  );
}
