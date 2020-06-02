import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { resetPasswordRequest } from "../../store/modules/auth/actions";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import api from "../../services/api";

export default function Cadastro() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [errorProvider, setErrorProvider] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [email, setEmail] = useState([]);

  async function handleEmail({ usu_email }) {
    try {
      const schema = Yup.object().shape({
        usu_email: Yup.string()
          .email("Digite um email valido")
          .required("O email é obrigatorio"),
      });
      await schema.validate(
        { usu_email },
        {
          abortEarly: false,
        }
      );

      const response = await api.post("/forgot_password", {usu_email});

      if (response.data.userDoesNotExists) {
        toast.error("Usuário não encontrado");
      }
      if (response.data.enviado) {
        toast.success("Código enviado ao seu e-mail");
        setResetMode(true);
        const mail = {usu_email: usu_email};
        setEmail(mail);
      }

      formRef.current.setErrors(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  async function resetarSenha({
    usu_email,
    usu_reset_token,
    usu_senha,
    confirmaSenha,
  }) {
    try {
      const schema = Yup.object().shape({
        usu_email: Yup.string()
          .email("Digite um email valido")
          .required("O email é obrigatorio"),
        usu_senha: Yup.string()
          .required("A senha é obrigatoria")
          .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&!@#%])[0-9a-zA-Z$*&!@#%]{6,45}$/,
            "Senha fraca!"
          ),
        confirmaSenha: Yup.string().when("usu_senha", (usu_senha, field) =>
          usu_senha
            ? field
                .required("Campo requerido")
                .oneOf([Yup.ref("usu_senha")], "As senhas são diferentes")
            : field
        ),
        usu_reset_token: Yup.string().required(
          "Insira o token recebido por e-mail."
        ),
      });

      await schema.validate(
        { usu_email, usu_senha, confirmaSenha, usu_reset_token },
        {
          abortEarly: false,
        }
      );

      dispatch(resetPasswordRequest(usu_email, usu_reset_token, usu_senha))

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
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-1">
          <Row style={{ justifyContent: "center" }}>
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Row lg="12" className="mb-3">
                    <Col xs="12 mt-2">
                      <p className="text-center" style={{ color: "red" }}>
                        {errorProvider !== "" ? errorProvider : " "}
                      </p>
                    </Col>
                  </Row>
                  <h1
                    style={{
                      fontSize: 25,
                      color: "rgb(255, 255, 255)",
                      marginBottom: 10,
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {resetMode ? `Nova senha` : `Recuperar Senha`}
                  </h1>
                  <Form
                    onSubmit={handleEmail}
                    style={
                      resetMode ? { display: "none" } : { display: "block" }
                    }
                  >
                    <Input
                      name="usu_email"
                      type="email"
                      placeholder="E-mail cadastrado"
                      required
                    />
                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Enviar código
                      </Button>
                    </div>
                  </Form>
                  <Form
                    onSubmit={resetarSenha}
                    ref={formRef}
                    initialData={email}
                    style={
                      !resetMode ? { display: "none" } : { display: "block" }
                    }
                  >
                    {console.log('teste aq',email)}
                    <Input
                      name="usu_email"
                      type="email"
                      placeholder="E-mail cadastrado"
                      disabled={true}
                    />
                    <Input
                      name="usu_reset_token"
                      type="text"
                      placeholder="Token recebido no email"
                    />
                    <Input
                      name="usu_senha"
                      type="password"
                      placeholder="Cadastre uma nova senha"
                    />
                    <Input
                      name="confirmaSenha"
                      type="password"
                      placeholder="Confirme sua nova senha"
                    />
                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Atualizar Senha
                      </Button>
                    </div>
                  </Form>
                  <Row className="mt-1">
                    <Col className="text-left" xs="6">
                      <a className="text-light" href="/">
                        <small>Voltar</small>
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
