import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { IoMdMicrophone, IoMdHeadset } from "react-icons/io";
import { AiFillQuestionCircle } from "react-icons/ai";
import { signUpRequest } from "../../store/modules/auth/actions";
import Input from "../../components/Input";

import { cpfMask } from "../../utils/Mask";
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

export default function Cadastro() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [tusId, setTusId] = useState("");
  const [buttonPodCaster, setButtonPodCaster] = useState("");
  const [buttonOuvinte, setButtonOuvinte] = useState("");
  const [errorProvider, setErrorProvider] = useState("");

  const [cpfMaskValue, setValueMask] = useState("");

  async function handleSubmit({ nome, senha, confirmarSenha, email, cpf }) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required("O nome de usuário é obrigatorio"),
        email: Yup.string()
          .email("Digite um email valido")
          .required("O email é obrigatorio"),
        senha: Yup.string()
          .required("A senha é obrigatorio")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&!@#%])[0-9a-zA-Z$*&!@#%]{6,45}$/,
            "Senha fraca!"
          ),
        confirmarSenha: Yup.string().when("senha", (senha, field) =>
          senha
            ? field
                .required("Campo requerido")
                .oneOf([Yup.ref("senha")], "As senhas são diferentes")
            : field
        ),
        cpf: Yup.string().required("O cpf é obrigatorio"),
      });

      await schema.validate(
        { nome, senha, confirmarSenha, email, cpf },
        {
          abortEarly: false,
        }
      );

      if (tusId !== "") {
        dispatch(signUpRequest(nome, senha, email, cpf, tusId));
      } else {
        setErrorProvider("Selecione entre Ouvinte ou Podcaster!");
      }
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

  function setProfile(id) {
    if (id === 1) {
      setButtonPodCaster("");
      setButtonOuvinte("buttonActive");
    } else {
      setButtonOuvinte("");
      setButtonPodCaster("buttonActive");
    }
    setErrorProvider("");
    setTusId(id);
  }

  function setMaskCPF(e) {
    setValueMask(cpfMask(e.target.value));
  }

  return (
    <>
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-1">
          <Row style={{ justifyContent: "center" }}>
            <Col lg="7">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5" style={{position:'relative'}}>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Row lg="12" className="mb-3">
                      <Col xs="6">
                        <Button
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#232659",
                            border: "none",
                            padding: "10px 0 10px 0",
                            color: "#1BFDBE",
                          }}
                          className={buttonOuvinte}
                          onClick={(e) => setProfile(1)}
                        >
                          <IoMdHeadset size={40} />
                          <p className="mt-2">Ouvinte</p>
                        </Button>
                      </Col>
                      <Col xs="6">
                        <Button
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#232659",
                            border: "none",
                            padding: "10px 0 10px 0",
                            color: "#1BFDBE",
                          }}
                          className={buttonPodCaster}
                          onClick={(e) => setProfile(2)}
                        >
                          <IoMdMicrophone size={40} />
                          <p className={"mt-2"}>Podcaster</p>
                        </Button>
                      </Col>
                      <Col xs="12 mt-2">
                        <p className="text-center" style={{ color: "red" }}>
                          {errorProvider !== "" ? errorProvider : " "}
                        </p>
                      </Col>
                    </Row>

                    <Input
                      name="nome"
                      type="text"
                      placeholder="Nome de usuário"
                    />
                    <Input name="email" type="email" placeholder="Seu e-mail" />
                    <Input
                      name="senha"
                      type="password"
                      placeholder="Sua senha "
                    />
                    <div className="d-flex">
                      <AiFillQuestionCircle
                        size={32}
                        color="rgb(27, 253, 190)"
                        style={{position:'absolute',bottom:313,right:50 }}
                        title="A senha deve conter no mínimo 6 caracteres entre: letra miníscula e maiúscula, números e caracteres especiais"
                      />
                    </div>

                    <Input
                      name="confirmarSenha"
                      type="password"
                      placeholder="Confirme a sua senha "
                    />
                    <Input
                      name="cpf"
                      type="text"
                      placeholder="CPF"
                      value={cpfMaskValue}
                      onChange={setMaskCPF}
                    />
                    {/* <Input className="has-success form-control" name="tipoUser" type="text" placeholder="teste tus_id"/>*/}

                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                  <Row>
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      ></a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/login">
                        <small>Já possuo uma conta</small>
                      </a>
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
