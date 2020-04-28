import React, { useState, useRef } from "react";
import { Button } from "reactstrap";
import { IoMdClose } from "react-icons/io";
import { Form } from "@unform/web";
import Textarea from "../Textarea";
import { useDispatch } from "react-redux";
import { answerComentarioRequest } from "../../store/modules/comentario/actions";

export default function Resposta({
  resposta,
  podcast,
  profile,
  responder,
  setResponder,
  item,
}) {
  const dispatch = useDispatch();

  async function handleResposta({ cmt_conteudo }) {
    dispatch(
      answerComentarioRequest(podcast.pod_id, 1, item.comment_id, cmt_conteudo)
    );
  }

  return (
    <>
      {resposta && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "5%",
            marginTop: 10,
          }}
        >
          Respostas
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: 30,
              marginTop: 5,
            }}
          >
            <div style={{ width: 30, height: 30 }}>
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
                width: "50%",
                height: 40,
                display: "flex",
                alignItems: "center",
                marginLeft: 20,
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {profile !== null ? profile.usu_nome : "Não logado"}
              </p>
            </div>
          </div>
          <div
            className="shadow"
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
            Lorem Ipsum is simply dummy text of theblishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      )}

      {responder == item.comment_id && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "5%",
              marginTop: 10,
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
            <Form onSubmit={handleResposta}>
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
