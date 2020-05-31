import React, { useRef, useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import pt from "date-fns/locale/pt";
import { DateRange} from "react-date-range";
import Input from "../../../../components/Input";
import { MdClose } from "react-icons/md";
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import api from "../../../../services/api";
import history from "../../../../services/history";
import { toast } from "react-toastify";

export default function Categoria() {
  const formRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: "",
      key: "selection",
    },
  ]);

  function getFile(file) {
    setPreview(URL.createObjectURL(file));
    setFile(file);
  }

  function deletePreview() {
    setPreview(null);
    setFile(null);
  }

  async function handleSubmit({ pub_descricao, pub_link }) {
    if (!state[0].endDate) {
      toast.error("Escolha uma data");
      return;
    }

    const dateTime = state[0].endDate.toISOString();
    const adata = dateTime.replace(
      /^(\d{4})-(\d{2})-(\d{2})(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/,
      "$1-$2-$3 $4:$5:$6"
    );

    if (!file) {
      toast.error("Imagem obrigatória");
      return;
    }

    if (file) {
      if (
        !file.type.includes("png") &&
        !file.type.includes("jpg") &&
        !file.type.includes("jpeg")
      ) {
        toast.error("Imagem deve ser PNG/JPG/JPEG");
        return;
      }
    }

    try {
      const schema = Yup.object().shape({
        pub_descricao: Yup.string().required("A descrição é obrigatória"),
        pub_link: Yup.string().required("O link é obrigatório"),
      });

      await schema.validate(
        { pub_descricao, pub_link },
        {
          abortEarly: false,
        }
      );

      const data = new FormData();
      data.append("pub_descricao", pub_descricao);
      data.append("pub_data_fim", adata);
      data.append("pub_link", pub_link);
      data.append("file", file);

      api.post("/publicidade", data);
      toast.success("Publicidade cadastrada!");
      history.push("/adm/dashboard/publicidade");

      formRef.current.setErrors(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        toast.error("Erro ao cadastrar publicidade");
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
                    <Row lg="12">
                      <Col lg="6" xs="12">
                        {preview ? (
                          <div lg="12" xs="12" style={{ height: "100%" }}>
                            <MdClose
                              size={30}
                              color={"#fff"}
                              className="closeIcon"
                              onClick={() => deletePreview()}
                            />
                            <img
                            alt="img-preview"
                              style={{
                                maxHeight: 400,
                                height: "100%",
                                width: "100%",
                                borderRadius: 15,
                              }}
                              src={preview}
                            />
                          </div>
                        ) : (
                          <input
                            type="file"
                            style={{ minHeight: 400 }}
                            name="pub_endereco_img"
                            type="file"
                            id="pub_endereco_img"
                            accept="image/*"
                            data-file={file}
                            onChange={(event) => getFile(event.target.files[0])}
                          />
                        )}
                      </Col>
                      <Col lg="6">
                        <Input
                          name="pub_descricao"
                          type="text"
                          placeholder="Descrição da Publicidade"
                        />

                        <Input
                          name="pub_link"
                          type="text"
                          placeholder="Site da publicidade"
                          className="mt-5"
                        />

                        {console.log(state)}

                        <DateRange
                          className="shadow"
                          editableDateInputs={true}
                          onChange={(item) => setState([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                          minDate={new Date()}
                          startDate={new Date()}
                          locale={pt}
                          color="#fff"
                          theme={{ color: "#fff" }}
                          rangeColors="#69deac"
                          required
                        />
                      </Col>
                    </Row>

                    <div className="text-center mt-5">
                      <Button type="submit" className="my-2" color="primary">
                        Cadastrar
                      </Button>
                    </div>
                  </Form>
                  <Row className="mt-1">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      ></a>
                    </Col>
                    <Col className="text-right" xs="6"></Col>
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
