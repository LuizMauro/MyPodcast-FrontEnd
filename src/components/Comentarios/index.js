import React, { useState, useRef } from "react";
import { Container, Button, Row, Col } from "reactstrap";
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

import Lottie from "react-lottie";
import * as animationData from "../../assets/animations/like.json";

export default function Comentario({
  data,
  profile,
  podcast,
  setUpdate,
  update,
  //  resposta
}) {
  const [responder, setResponder] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cmtEdit, setCmtEdit] = useState([]);
  const comentario = data;
  const [resposta, setResposta] = useState([]);

  const dispatch = useDispatch();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function handleLike(item) {
    if (profile) {
    }
  }

  async function handleDislike(item) {
    if (profile) {
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
    setUpdate(update ? false : true);
    setEditMode(false);
  }

  async function deletarComentario(comentario) {
    console.log("ids", comentario.pod_id, comentario.comment_id);
    dispatch(deleteComentarioRequest(comentario.pod_id, comentario.comment_id));
    setUpdate(update ? false : true);
  }

  return (
    <>
      {comentario.map(
        (item) =>
          !item.id_comentario_pai && (
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
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <p
                    style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}
                  >
                    {item.usu_nome}
                  </p>
                </div>
              </div>

              <div
                style={
                  editMode && cmtEdit.comment_id === item.comment_id
                    ? {
                        display: "block",
                        width: "100%",
                        background: "#232659",
                        minHeight: 80,
                        maxHeight: "auto",
                        borderRadius: 4,
                        padding: 10,
                        color: "#fff",
                      }
                    : { display: "none" }
                }
              >
                <Form initialData={cmtEdit} onSubmit={handleEdit}>
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
                      className="button edit"
                      onClick={(e) => editarComentario(item)}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      className="button delete"
                      onClick={(e) => deletarComentario(item)}
                    >
                      <FaTimes size={18} />
                    </button>
                  </S.IconWrapper>
                )}

                <p style={profile && { margin: "15px 0" }}>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      margin: "10px 0",
                    }}
                  >
                    <a
                      onClick={(e) => {
                        handleLike(item);
                      }}
                      style={{ marginRight: 20 }}
                    >
                      <FiThumbsUp size={30} />
                      {item.qtd_likes}
                    </a>

                    <a
                      onClick={(e) => {
                        handleDislike(item);
                      }}
                    >
                      <FiThumbsDown size={30} />
                      {item.qtd_dislikes}
                    </a>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 30,
                      flexDirection: "row",
                    }}
                  >
                    <a
                      onClick={() => {
                        habilitarResposta(item.comment_id);
                      }}
                      style={{
                        alignItems: "center",
                        cursor: "pointer",
                        color: "#1bfdbe",
                      }}
                    >
                      Responder
                    </a>
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
                  setUpdate={setUpdate}
                  update={update}
                  setEditMode={setEditMode}
                  editMode={editMode}
                />
              </S.CommentWrapper>
            </div>
          )
      )}
    </>
  );
}
