import React, { useState, useEffect} from  "react";
import { Card, CardBody, Row, Col, CardTitle } from "reactstrap";
import { Line, Bar } from 'react-chartjs-2';


const data = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],


 datasets: [
   {
     label: 'campo1',
     fill: false,
     lineTension: 0.3,
     backgroundColor: 'rgba(75,192,192,0.4)',
     borderColor: 'rgba(75,192,192,1)',
     borderCapStyle: 'butt',
     borderDash: [],
     borderDashOffset: 0.0,
     borderJoinStyle: 'miter',
     pointBorderColor: '#1bfdbe',
     pointBackgroundColor: '#fff',
     pointBorderWidth: 5,
     pointHoverRadius: 8,
     pointHoverBackgroundColor: '#1bfdbe',
     pointHoverBorderColor: '#1bfdbe',
     pointHoverBorderWidth: 2,
     pointRadius: 1,
     pointHitRadius: 10,
     data: [65, 38, 100]
   },
   {
     label: 'My First dataset 2',
     fill: false,
     lineTension: 0.3,
     backgroundColor: '#ff6384',
     borderColor: '#ff6384',
     borderCapStyle: 'butt',
     borderDash: [],
     borderDashOffset: 0.0,
     borderJoinStyle: 'miter',
     pointBorderColor: '#ff6384',
     pointBackgroundColor: '#fff',
     pointBorderWidth: 5,
     pointHoverRadius: 8,
     pointHoverBackgroundColor: '#ff6384',
     pointHoverBorderColor: '#ff6384',
     pointHoverBorderWidth: 2,
     pointRadius: 1,
     pointHitRadius: 10,
     data: [20, 3]
   }
 ],
 
};



export default function Outros({relatorio}) {

  useEffect(() => {
    console.log(relatorio)
  })

  return (
    <>
      <Col lg="4 mt-3">
        <Card className="bg-secondary shadow border-0 relatorio-info-double">
          <CardBody
            style={{ justifyContent: "center" }}
            enctype="multipart/form-data"
          >
            <CardTitle className="dash-home-title">
              Categorias Cadastradas
            </CardTitle>
            <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
              <span className="relatorio-span white">
                {relatorio.qtd_categoria}
              </span>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4 mt-3">
        <Card className="bg-secondary shadow border-0 relatorio-info-double">
          <CardBody
            style={{ justifyContent: "center" }}
            enctype="multipart/form-data"
          >
            <CardTitle className="dash-home-title">
              Comentários Publicados
            </CardTitle>
            <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
              <span className="relatorio-span white">
                {relatorio.qtd_comentario}
              </span>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4 mt-3">
        <Card className="bg-secondary shadow border-0 relatorio-info-double">
          <CardBody
            style={{ justifyContent: "center" }}
            enctype="multipart/form-data"
          >
            <CardTitle className="dash-home-title">
              Publicidades Cadastradas
            </CardTitle>
            <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
              <span className="relatorio-span white">
                {relatorio.qtd_publicidade}
              </span>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col lg="12">
        <Card className="bg-secondary shadow border-0 relatorio-info-double">
          <CardBody
            style={{ justifyContent: "center" }}
            enctype="multipart/form-data"
          >
            <CardTitle className="dash-home-title">
              Gráfico
            </CardTitle>
            <Row className="mt-1 pt-3" style={{ justifyContent: "center" }}>
            <Row>
                    <Col lg="12" sm="12" >
                      <h1>Teste 1</h1>
                        <Line data={data} width={100} height={"50%"} options={{
                            responsive: true,
                            maintainAspectRatio: true,
                          }}  color={"#1bfdbe"}  />
                      </Col>

                      <Col lg="12" sm="12" >
                      <h1>Teste 4</h1>
                        <Bar data={data} width={100} height={"50%"} options={{
                            responsive: true,
                            maintainAspectRatio: true,
                          }}   />
                      </Col>
                  </Row>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
