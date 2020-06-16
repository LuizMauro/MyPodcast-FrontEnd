import React, { useEffect, useState, useMemo } from "react";
import "./index.css";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
  Button,
} from "reactstrap";
import api from "../../../services/api";
import pt from "date-fns/locale/pt";
import { differenceInDays, differenceInMonths, time, lastDayOfMonth, 
getDaysInMonth, differenceInCalendarDays, differenceInCalendarMonths,
parseISO, formatRelative,  } from 'date-fns';

import { date } from "yup";

export default function Assinatura() {
  const [dados, setDados] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadAssinatura() {
      const response = await api.get("/assinatura");

      setDados(response.data);    

     

      const lastdayofmonth = lastDayOfMonth(Date.now());

      console.log("TESTE -> ", differenceInCalendarMonths(new Date(), Date.now()));
      console.log("TESTE2 -> ", differenceInCalendarDays(new Date(response.data.ass_datafim), Date.now()));

      if(differenceInCalendarDays(new Date(response.data.ass_datafim), Date.now()) > getDaysInMonth(lastdayofmonth) ){
        setData(`${differenceInCalendarMonths( new Date(response.data.ass_datafim), Date.now())} meses`);
      }else{
        setData(`${differenceInDays(new Date(response.data.ass_datafim),  Date.now())} dias`);
      }

    
    }

    loadAssinatura();
  }, []);

  async function handleCancelar(){
    api.put('/assinatura');
  }

  return (
    <>
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-1">
          <Row style={{ justifyContent: "center" }}>
            <Col lg="12">
              <Card className="bg-secondary shadow border-0">
                <CardBody
                  className="px-lg-5 py-lg-5"
                  enctype="multipart/form-data"
                >
                  <CardTitle
                    style={{ fontSize: 25, color: "#fff", marginTop: 20 }}
                  >
                    <strong>Status da Assinatura</strong>
                  </CardTitle>
                  <Row>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Plano:{" "}
                        <span className="ass-text">{dados.pln_descricao}</span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Status da Assinatura:
                        <span className="ass-text">
                          {dados.ass_status ? ` Ativa` : ` Cancelada`}
                        </span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Valor:{" "}
                        <span className="ass-text">
                          {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(dados.ass_preco)}
                        </span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title" title="Renovação Automática">
                        Forma de Pagamento:{" "}
                        <span className="ass-text">{dados.fpg_descricao}</span>
                      </h4>
                    </Col>
                    <Col sm="12" md="6" className="mb-3">
                      <h4 className="ass-title">
                        Assinatura expira em:{" "}
                        <span className="ass-text">{data}</span>
                      </h4>
                    </Col>
                  
                      <Col sm="12" md="6" className="mb-3 center">
                        <Button
                          className="btn-primary"
                          style={{ width: "80%" }}
                          onClick={handleCancelar}
                        >
                          Cancelar Assinatura
                        </Button>
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
