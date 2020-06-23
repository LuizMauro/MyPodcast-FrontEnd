import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { Form } from "@unform/web";
import Textarea from "../Textarea";
import { FaPen, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import Resposta from "../ComentarioResposta/index";
import { useDispatch } from "react-redux";
import {
  deleteComentarioRequest,
  updateComentarioRequest,
} from "../../store/modules/comentario/actions";
import * as S from "./styled";
import { parseISO, formatRelative } from "date-fns";
import pt from "date-fns/locale/pt";
import firebase from "../../config/firebaseConfig";

export default function Comentario({
  data,
  profile,
  podcast,
  setUpdate,
  update,
  dash,
  limit,
  currentPage
}) {
  const [responder, setResponder] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cmtEdit, setCmtEdit] = useState([]);
  const comentario = data;
  const database = firebase.database();

  let userComment = null;
  let userCommentId = null;

  const dispatch = useDispatch();

  //item, userComment
  function createNotification(comentario, userId, userCommentId) {
    if (userCommentId !== comentario.usu_id) {
      database.ref(`notifications/` + comentario.usu_id).push({
        title: `${userId} deu like no seu comentário em ${podcast.pod_nome}`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
      });
    }
  }

  function createNotificationDislike(comentario, userId, userCommentId) {
    if (userCommentId !== comentario.usu_id) {
      database.ref(`notifications/` + comentario.usu_id).push({
        title: `${userId} deu dislike no seu comentário em ${podcast.pod_nome}`,
        url: `http://localhost:3000/podcast/${podcast.pod_id}`,
        datetime: Date.now(),
        viewed: 0,
      });
    }
  }

  async function handleLike(item) {
    if (profile) {
      const verifica = await api.get(`/likeuser/${item.comment_id}`);
      console.log("tipo", verifica.data);
      userComment = profile.usu_nome;
      userCommentId = profile.usu_id;

      if (!verifica.data[0]) {
        //se caiu aqui nao deu like ainda
        await api.post(`/like/${item.comment_id}`);
        console.log("dando like");
        createNotification(item, userComment, userCommentId);
      } else if (verifica.data[0].lik_status === 0) {
        //Aqui dá like novamente se tirou o like antes
        console.log("like de novo");

        if (verifica.data[0].lik_tipo === 1) {
          await api.put(`/likestatus/${verifica.data[0].lik_id}/1`);
        } else {
          await api.put(`/mudarlike/${verifica.data[0].lik_id}/1`);
          await api.put(`/likestatus/${verifica.data[0].lik_id}/1`);
        }
      } else if (verifica.data[0]) {
        //caiu aqui já deu like ou dislike (lik_tipo 1 ou 2), vai verificar qual pra fazer update

        if (verifica.data[0].lik_tipo === 1) {
          // Já tem like e tá clicando de novo no like pra tirar o like
          console.log("tirando like");
          await api.put(`/likestatus/${verifica.data[0].lik_id}/0`);
        } else {
          console.log("mudando para dislike");
          await api.put(`/mudarlike/${verifica.data[0].lik_id}/1`);
          createNotification(item, userComment, userCommentId);
        }
      }
      setUpdate(false);
    }
  }

  async function handleDislike(item) {
    if (profile) {
      const verifica = await api.get(`/likeuser/${item.comment_id}`);
      console.log("tipo", verifica.data);
      userComment = profile.usu_nome;
      userCommentId = profile.usu_id;

      if (!verifica.data[0]) {
        //se caiu aqui nao deu dislike ainda
        console.log("dando dislike");
        await api.post(`/dislike/${item.comment_id}`);
        createNotificationDislike(item, userComment, userCommentId);
      } else if (verifica.data[0].lik_status === 0) {
        //Aqui dá like novamente se tirou o like antes
        console.log("dislike de novo");

        if (verifica.data[0].lik_tipo === 0) {
          await api.put(`/likestatus/${verifica.data[0].lik_id}/1`);
        } else {
          await api.put(`/mudarlike/${verifica.data[0].lik_id}/0`);
          await api.put(`/likestatus/${verifica.data[0].lik_id}/1`);
        }
      } else if (verifica.data[0]) {
        //caiu aqui já deu like ou dislike (lik_tipo 1 ou 2), vai verificar qual pra fazer update

        if (verifica.data[0].lik_tipo === 0) {
          // Já tem like e tá clicando de novo no like pra tirar o like
          console.log("tirando dislike");
          await api.put(`/likestatus/${verifica.data[0].lik_id}/0`);
        } else {
          console.log("mudando para like");
          await api.put(`/mudarlike/${verifica.data[0].lik_id}/0`);
          createNotificationDislike(item, userComment, userCommentId);
        }
      }
      setUpdate(false);
    }
  }

  async function habilitarResposta(id) {
    setResponder(id);
  }

  async function editarComentario(item) {
    setEditMode(true);
    setCmtEdit(item);
  }

  async function handleEdit({ cmt_conteudo }) {
    const cmtid = cmtEdit.comment_id;
    dispatch(updateComentarioRequest(podcast.pod_id, cmtid, cmt_conteudo));
    setUpdate(false);
    setEditMode(false);
  }

  async function deletarComentario(comentario) {
    console.log("ids", comentario.pod_id, comentario.comment_id);
    dispatch(deleteComentarioRequest(comentario.pod_id, comentario.comment_id));
    setUpdate(false);
  }

  return (
    <>
      {comentario.filter(item => !item.id_comentario_pai).slice(0, limit * currentPage).map(
        (item) =>
        
            <div
              key={item.comment_id}
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
                  <img
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                    }}
                    src={"https://api.adorable.io/avatars/285/" + item.usu_nome}
                  />
                </div>
                <div
                  style={{
                    width: "40%",
                    height: 60,
                    display: "grid",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 20,
                      marginBottom: 0,
                    }}
                  >
                    {item.usu_nome}
                  </p>
                  <p style={{ color: "#fff", fontSize: 12, marginTop: -10 }}>
                    {formatRelative(
                      parseISO(item.cmt_datacriacao),
                      new Date(),
                      {
                        locale: pt,
                        addSuffix: true,
                      }
                    )}
                  </p>
                </div>
              </div>

              <div
                style={
                  editMode && cmtEdit.comment_id === item.comment_id
                    ? {
                        display: "block",
                        width: "100%",
                        background: "#151734",
                        minHeight: 80,
                        maxHeight: "auto",
                        borderRadius: 4,
                        padding: 10,
                        color: "#fff",
                      }
                    : { display: "none" }
                }
              >
                <Form
                  initialData={cmtEdit}
                  onSubmit={handleEdit}
                  style={{ paddingBottom: 0 }}
                >
                  <Textarea
                    name="cmt_conteudo"
                    placeholder="Digite um comentário"
                    type="text"
                    required
                  ></Textarea>
                  <Row>
                    <Col lg="6" className="text-left" style={{ marginTop: 10 }}>
                      <Button
                        onClick={(e) => setEditMode(false)}
                        color="primary"
                      >
                        Cancelar
                      </Button>
                    </Col>
                    <Col
                      lg="6"
                      className="text-right"
                      style={{ marginTop: 10 }}
                    >
                      <Button type="submit" color="primary">
                        Salvar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <S.CommentWrapper
                key={item.comment_id}
                style={
                  editMode && cmtEdit.comment_id === item.comment_id
                    ? {
                        display: "none",
                        width: "100%",
                        background: "#232659",
                        minHeight: 80,
                        maxHeight: "auto",
                        borderRadius: 4,
                        padding: 10,
                        color: "#fff",
                      }
                    : {
                        display: "block",
                        width: "100%",
                        background: "#232659",
                        minHeight: 80,
                        maxHeight: "auto",
                        borderRadius: 4,
                        padding: 10,
                        color: "#fff",
                      }
                }
              >
                {profile && profile.usu_id === item.usu_id && (
                  <S.IconWrapper>
                    <button
                      className="button edit-comment"
                      onClick={(e) => editarComentario(item)}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      className="button delete-comment"
                      onClick={(e) => deletarComentario(item)}
                    >
                      <FaTimes size={18} />
                    </button>
                  </S.IconWrapper>
                )}

                <p
                  style={
                    profile && !dash
                      ? {
                          margin: "15px 0",
                          background: "#151734",
                          padding: 15,
                        }
                      : {
                          margin: 0,
                          marginBottom: 0,
                          background: "#151734",
                          padding: 15,
                        }
                  }
                >
                  {item.cmt_conteudo}{" "}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: "1px dashed #ccc",
                  }}
                >
                  <div
                    style={
                      dash
                        ? {
                            display: "none",
                            alignItems: "center",
                            flexDirection: "row",
                            margin: "10px 0",
                          }
                        : {
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            margin: "10px 0",
                          }
                    }
                  >
                    <i
                      onClick={(e) => {
                        handleLike(item);
                      }}
                      style={{ marginRight: 20 }}
                    >
                      <FiThumbsUp
                        size={30}
                        style={profile && { cursor: "pointer" }}
                      />
                      {item.qtd_likes}
                    </i>

                    <i
                      onClick={(e) => {
                        handleDislike(item);
                      }}
                    >
                      <FiThumbsDown
                        size={30}
                        style={profile && { cursor: "pointer" }}
                      />
                      {item.qtd_dislikes}
                    </i>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 30,
                      flexDirection: "row",
                    }}
                  >
                    <i
                      onClick={() => {
                        habilitarResposta(item.comment_id);
                      }}
                      style={
                        dash
                          ? {
                              alignItems: "center",
                              cursor: "pointer",
                              color: "#1bfdbe",
                              display: "none",
                            }
                          : {
                              alignItems: "center",
                              cursor: "pointer",
                              color: "#1bfdbe",
                            }
                      }
                    >
                      Responder
                    </i>
                  </div>
                </div>

                <Resposta
                  podcast={podcast}
                  profile={profile}
                  responder={responder}
                  setResponder={setResponder}
                  setUpdate={setUpdate}
                  item={item}
                  comentario={comentario}
                  update={update}
                  setEditMode={setEditMode}
                  editMode={editMode}
                />
              </S.CommentWrapper>
            </div>
          
      )}
    </>
  );
}
