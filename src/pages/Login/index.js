import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

import { logarRequest } from "../../store/modules/auth/actions";
import Input from "../../components/Input";

import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [isVerified, setIsVerifed] = useState(false);

  async function handleSubmit({ email, senha }) {
    if (!isVerified) {
      return toast.error("Preencha o reCAPTCHA para efetuar login.");
    }

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("O nome é obrigatorio")
          .email("Digite um email valido"),
        senha: Yup.string()
          .required("A senha é obrigatorio")
          .min(6, "Minimo de 6 caracteres"),
      });

      await schema.validate(
        { email, senha },
        {
          abortEarly: false,
        }
      );

      dispatch(logarRequest(email, senha));
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
    console.log(email, senha);
  }

  async function recaptchaVerify(v) {
    if (v) {
      setIsVerifed(true);
    }
  }

  return (
    <>
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                      className="has-success form-control"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                    />
                    <Input
                      className="has-success form-control"
                      name="senha"
                      type="password"
                      placeholder="Senha"
                    />

                    <div className="text-center">
                      <Button type="submit" className="my-4" color="primary">
                        Entrar
                      </Button>
                    </div>

                    <ReCAPTCHA
                      sitekey="6LeY6fUUAAAAAMaL1WdfSI7l0O0PjgBKdSXX7-dM"
                      onChange={(v) => recaptchaVerify(v)}
                    />
                  </Form>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a className="text-light" href="/forgot_password">
                        <small>Esqueci a senha</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/cadastro">
                        <small>Criar nova conta</small>
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
