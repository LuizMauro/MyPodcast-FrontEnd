import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Container, Button } from "reactstrap";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { FaPen, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import Resposta from "../ComentarioResposta/index";
import { useDispatch } from "react-redux";
import { deleteComentarioRequest } from "../../store/modules/comentario/actions";
import * as S from "./styled";

import Lottie from "react-lottie";
import * as animationData from "../../assets/animations/like.json";

export default function Comentario({ data, profile, podcast, setUpdate }) {
  const [responder, setResponder] = useState(false);
  const comentario = data;
  const resposta = false;
  const dispatch = useDispatch();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function editarComentario(item) {
    console.log("dados", item);
  }

  async function deletarComentario(comentario) {
    console.log("ids", comentario.pod_id, comentario.cmt_id);
    setUpdate(true ? false : true);
    dispatch(deleteComentarioRequest(comentario.pod_id, comentario.cmt_id));
  }

  return (
    <>
      {comentario.map((item) => (
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
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  src={"https://api.adorable.io/avatars/285/" + item.usu_nome}
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
                {item.usu_nome}
              </p>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              background: "#232659",
              minHeight: 80,
              maxHeight: "auto",
              borderRadius: 4,
              padding: 10,
              color: "#fff",
            }}
          >
            {profile.usu_id === item.usu_id && (
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

            <p style={{ margin: "15px 0" }}>{item.cmt_conteudo} </p>
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
                <a onClick={() => {}} style={{ marginRight: 20 }}>
                  <FiThumbsUp size={30} />
                  {item.qtd_likes}
                </a>

                <a onClick={() => {}}>
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
                    setResponder(true);
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
              resposta={resposta}
              profile={profile}
              responder={responder}
              setResponder={setResponder}
              setUpdate={setUpdate}
            />
          </div>
        </div>
      ))}
    </>
  );
}
