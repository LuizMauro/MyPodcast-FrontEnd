import React, { useState, useRef } from "react";
import { Button, Row, Col } from "reactstrap";
import { IoMdClose } from "react-icons/io";
import { Form } from "@unform/web";
import Textarea from "../Textarea";
import { useDispatch } from "react-redux";
import history from "../../services/history";
import { toast } from "react-toastify";
import {
  answerComentarioRequest,
  deleteComentarioRequest,
  updateComentarioRequest,
} from "../../store/modules/comentario/actions";
import { FaPen, FaTimes } from "react-icons/fa";
import * as S from "../Comentarios/styled";

export default function Resposta({
  podcast,
  profile,
  responder,
  setResponder,
  item,
  comentario,
  setUpdate,
  update,
  setEditMode,
  editMode,
}) {
  const dispatch = useDispatch();
  const [cmtEdit, setCmtEdit] = useState([]);
  const formRef = useRef(null);

  async function handleResposta({ cmt_conteudo }) {
    if (profile) {
      dispatch(
        answerComentarioRequest(
          podcast.pod_id,
          1,
          item.comment_id,
          cmt_conteudo
        )
      );
      setUpdate(update ? false : true);
      formRef.current.reset();
    } else {
      toast.error("Você precisa entrar para realizar esta ação");
      history.push("/cadastro");
    }
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
        (answer) =>
          answer.id_comentario_pai === item.comment_id && (
            <>
              <div
                style={
                  editMode && cmtEdit.comment_id === answer.comment_id
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

              <div
                style={
                  editMode && cmtEdit.comment_id === answer.comment_id
                    ? {
                        display: "none",
                        flexDirection: "column",
                        marginLeft: "5%",
                        marginTop: 10,
                      }
                    : {
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "5%",
                        marginTop: 10,
                      }
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: 30,
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: 30, height: 30 }}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                      }}
                      src={
                        "https://api.adorable.io/avatars/285/" + answer.usu_nome
                      }
                      alt="avatar"
                    />
                  </div>

                  <div
                    style={{
                      width: "50%",
                      height: 40,
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
                        marginTop: -8,
                        marginBottom: 0,
                      }}
                    >
                      {answer.usu_nome}
                    </p>
                    <p style={{ color: "#fff", fontSize: 12, marginTop: -10 }}>
                      {answer.cmt_datacriacao}
                    </p>
                  </div>
                </div>
                {profile && profile.usu_id === answer.usu_id && (
                  <S.IconWrapper>
                    <button
                      className="button edit edit-answer"
                      onClick={(e) => editarComentario(answer)}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      className="button delete delete-answer"
                      onClick={(e) => deletarComentario(answer)}
                    >
                      <FaTimes size={18} />
                    </button>
                  </S.IconWrapper>
                )}
                <div
                  className="shadow"
                  style={{
                    width: "100%",
                    background: "#151734",
                    minHeight: 80,
                    maxHeight: "auto",
                    borderRadius: 4,
                    padding: 10,
                    color: "#fff",
                    marginTop: 10,
                  }}
                >
                  {answer.cmt_conteudo}
                </div>
              </div>
            </>
          )
      )}

      {responder === item.comment_id && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "5%",
              marginTop: 15,
            }}
          >
            <a
              onClick={() => {
                setResponder(false);
              }}
            >
              <IoMdClose
                size={35}
                style={{ float: "right" }}
                color="#fff"
              ></IoMdClose>
            </a>
            <Form ref={formRef} onSubmit={handleResposta}>
              <Textarea
                className="shadow"
                name="cmt_conteudo"
                required
                style={{
                  width: "100%",
                  background: "#232659",
                  minHeight: 100,
                  borderRadius: 4,
                  border: "1px solid #666",
                  padding: 5,
                  color: "#fff",
                }}
                placeholder="Digite sua resposta"
              ></Textarea>
              <div className="text-right" style={{ marginTop: 10 }}>
                <Button type="submit" color="primary">
                  Responder
                </Button>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
