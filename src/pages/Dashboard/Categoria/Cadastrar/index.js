import React, { useRef} from "react";
import { useDispatch } from "react-redux";
import { createCategoriaRequest } from "../../../../store/modules/categoria/actions";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Input from "../../../../components/Input";

import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

export default function Categoria() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  async function handleSubmit({ ctg_descricao, reset }) {
    try {
      const schema = Yup.object().shape({
        ctg_descricao: Yup.string().required("A categoria é obrigatória"),
      });

      await schema.validate(
        { ctg_descricao },
        {
          abortEarly: false,
        }
      );

      dispatch(createCategoriaRequest(ctg_descricao));

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
            <Col lg="12">
              <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                      name="ctg_descricao"
                      type="text"
                      placeholder="Descrição da Categoria"
                    />

                    <div className="text-center">
                      <Button type="submit" className="my-2" color="primary">
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
