import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import Menu from "../../components/Menu";
import * as Yup from "yup";
import { MdClose } from "react-icons/md";
import "./style.css";

import api from "../../services/api";

import { updateProfileRequest } from "../../store/modules/user/actions";

import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Profile() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [podcast, setPodcast] = useState([]);
  const [editMode, setEditMode] = useState(false);

  console.log(profile);

  useEffect(() => {
    exibirPodcasts();
  }, [profile]);

  async function exibirPodcasts() {
    const response = await api.get("/profile");
    console.log(response.data);
    setPodcast(response.data);
  }

  async function handleSubmit({
    usu_nome,
    usu_email,
    senhaAntiga,
    usu_senha,
    confirmaSenha,
  }) {
    try {
      if (senhaAntiga && usu_senha && confirmaSenha) {
        const schema = Yup.object().shape({
          /*senhaAntiga: Yup.string().when("senhaAntiga", (senhaAntiga, field) =>
          senhaAntiga
            ? field
                .required("Campo requerido")
                .oneOf([Yup.ref("senhaAntiga")], "As senhas são diferentes")
            : field
        ),*/
          usu_senha: Yup.string().matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&!@#%])[0-9a-zA-Z$*&!@#%]{6,45}$/,
            "Senha fraca!"
            //)
            //.when("senha", (senha, field) =>
            //  senha ? field.required("Campo requerido") : field
          ),
          confirmaSenha: Yup.string().when("usu_senha", (usu_senha, field) =>
            usu_senha
              ? field
                  .required("Campo requerido")
                  .oneOf([Yup.ref("usu_senha")], "As senhas são diferentes")
              : field
          ),
        });

        await schema.validate(
          { usu_senha, confirmaSenha },
          {
            abortEarly: false,
          }
        );
      }
      
      dispatch(
        updateProfileRequest(
          usu_nome,
          usu_email,
          senhaAntiga,
          usu_senha,
          confirmaSenha
        )
      );
      formRef.current.setErrors(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        console.log(errorMessages);

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <Menu></Menu>
      <section className="section section-shaped section-lg">
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <Col lg="12">
              <Card className="bg-secondary shadow border-0 ">
                <MdClose
                  size={40}
                  color={"#fff"}
                  className="closeIcon"
                  style={editMode ? { display: "block" } : { display: "none" }}
                  onClick={() => setEditMode(false)}
                />
                <CardBody className="px-lg-3 py-lg-3">
                  <Form
                    ref={formRef}
                    initialData={profile}
                    onSubmit={handleSubmit}
                    style={
                      editMode ? { display: "block" } : { display: "none" }
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ width: "30%", height: "30%", margin: 5 }}>
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                          src={
                            "https://api.adorable.io/avatars/285/" +
                            profile.usu_email
                          }
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          width: 500,
                          padding: 20,
                          flexDirection: "column",
                        }}
                      >
                        <Input
                          className="has-success form-control"
                          name="usu_nome"
                          type="text"
                          placeholder="Nome"
                          required
                        />
                        <Input
                          className="has-success form-control"
                          name="usu_email"
                          type="email"
                          placeholder="Seu e-mail"
                          required
                        />
                        <hr className="hr-primary" />
                        <h4 style={{ color: "#fff" }}> Alterar senha</h4>
                        <Input
                          className="has-success form-control"
                          name="senhaAntiga"
                          type="password"
                          placeholder="Senha atual"
                        />
                        <Input
                          className="has-success form-control"
                          name="usu_senha"
                          type="password"
                          placeholder="Nova senha"
                        />
                        <Input
                          className="has-success form-control"
                          name="confirmaSenha"
                          type="password"
                          placeholder="Confirmar nova senha"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        type="submit"
                        color="primary"
                        onClick={() => setEditMode(false)}
                      >
                        Salvar alterações
                      </Button>
                    </div>
                  </Form>
                  <div>
                    <div
                      style={editMode ? { display: "none" } : { display: "" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "25%", height: "25%", margin: 5 }}>
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                            }}
                            src={
                              "https://api.adorable.io/avatars/285/" +
                              profile.usu_email
                            }
                          />

                          <Button
                            style={{ width: "100%" }}
                            type="submit"
                            className="my-3"
                            color="primary"
                            onClick={() => setEditMode(true)}
                          >
                            Editar Perfil
                          </Button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            width: 500,
                            flexDirection: "column",
                          }}
                        >
                          <h4 style={{ margin: 15, color: "#fff" }}>
                            <strong>Usuário:</strong> {profile.usu_nome}
                          </h4>
                          <h4 style={{ margin: 15, color: "#fff" }}>
                            <strong>E-mail:</strong> {profile.usu_email}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Row className="mt-5">
                    <Col lg="4" xs="12">
                      <Card
                        style={{
                          borderRadius: 15,
                          background: "#151734",
                          minHeight: 250,
                        }}
                        className="teste card-body mb-3"
                      >
                        <CardTitle className="title-primary">
                          <h4 style={{ color: "#1bfdbe", fontWeight: "bold" }}>
                            Favoritos
                          </h4>
                        </CardTitle>
                        <ul>
                          {podcast.map((pod) => (
                            <li style={{ color: "#fff" }} key={podcast.fbk_id}>
                              {pod.tfb_id === 1 &&
                                pod.fbk_status === 1 &&
                                pod.pod_nome}
                              {pod.tfb_id === 1 &&
                                pod.fbk_status === 1 &&
                                ` - `}
                              {pod.tfb_id === 1 &&
                                pod.fbk_status === 1 &&
                                !pod.nota &&
                                ``}
                              {pod.tfb_id === 1 &&
                                pod.fbk_status === 1 &&
                                pod.nota !== 0 &&
                                pod.nota}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    <Col lg="4" xs="12">
                      <Card
                        style={{
                          borderRadius: 15,
                          background: "#151734",
                          minHeight: 250,
                        }}
                        className="teste card-body mb-3"
                      >
                        <CardTitle className="title-primary">
                          <h4 style={{ color: "#1bfdbe", fontWeight: "bold" }}>
                            Acompanhando
                          </h4>
                        </CardTitle>
                        <ul>
                          {podcast.map((pod) => (
                            <li style={{ color: "#fff" }} key={podcast.fbk_id}>
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 1 &&
                                pod.pod_nome}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 1 &&
                                ` - `}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 1 &&
                                !pod.nota &&
                                ``}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 1 &&
                                pod.nota !== 0 &&
                                pod.nota}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                    <Col lg="4" xs="12">
                      <Card
                        style={{
                          borderRadius: 15,
                          background: "#151734",
                          minHeight: 250,
                        }}
                        className="teste card-body mb-3"
                      >
                        <CardTitle className="title-primary">
                          <h4 style={{ color: "#1bfdbe", fontWeight: "bold" }}>
                            Pretendo acompanhar
                          </h4>
                        </CardTitle>
                        <ul>
                          {podcast.map((pod) => (
                            <li style={{ color: "#fff" }} key={podcast.fbk_id}>
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 2 &&
                                pod.pod_nome}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 2 &&
                                ` - `}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 2 &&
                                !pod.nota &&
                                ``}
                              {pod.tfb_id === 2 &&
                                pod.fbk_status === 2 &&
                                pod.nota !== 0 &&
                                pod.nota}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
