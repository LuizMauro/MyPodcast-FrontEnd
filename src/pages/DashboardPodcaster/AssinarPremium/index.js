import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import InputMask from 'react-input-mask';

import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardTitle,
} from "reactstrap";

export default function EditarPodcast() {
  const [editMode, setEditMode] = useState(false);
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [editarPod, setEditarPod] = useState([]);
  const [update, setUpdate] = useState(false);

  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");


  function handleInputFocus(e){
    setFocus(e.target.name);
  }




  return (
    <>
      {console.log(podcasts)}
      <section className="section section-shaped section-lg">
        <Container className="pt-lg-1">
          <Row style={{ justifyContent: "center" }}>
            <Col lg="12">
              <Card className="bg-secondary shadow border-0">
                <CardBody
                  className="px-lg-5 py-lg-5"
                  enctype="multipart/form-data"
                >


<div id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
          acceptedCards={['visa', 'mastercard', ]}
          placeholders={{name:"NOME DO TITULAR", }}
          locale={{valid: "DATA"}}

        />

        <form className="form" style={{width:"100%", display:"flex", justifyContent:"center"}} >

          <div className="divInputs" style={{display:"flex", flexDirection:"column", alignContent:"center", justifyContent:"center", width:400}}>
          <InputMask className="inputs shadow"
              type="tel"
              name ="number"
              placeholder="Numero do cartão"
              onChange={(e) => setNumber(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              mask="9999 9999 9999 9999999"
              maskChar=" "
              required={true} 
              style={{marginTop:20, background:" rgb(35, 38, 89)", border:0, color: "rgb(255, 255, 255)", padding:10}}
            />
 

            <InputMask className="inputs"
              type="tel"
              name ="name"
              placeholder="Nome do titular"
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              required={true}
              style={{marginTop:20, background:" rgb(35, 38, 89)", border:0, color: "rgb(255, 255, 255)",  padding:10}}
            />
         


         
          <InputMask className="inputs inputdivide"
              type="tel"
              name ="expiry"
              placeholder="MM/AA"
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              maxLength={6}
              maskChar=" "
              mask="99/99"
              required={true}
              style={{marginTop:20, background:" rgb(35, 38, 89)", border:0, color: "rgb(255, 255, 255)", padding:10}}
            />


            <input  className="inputs inputdivide"
              type="tel"
              name ="cvc"
              placeholder="CVV"
              onChange={(e) => setCvc(e.target.value)}
              onFocus={(e) => handleInputFocus(e)}
              maxLength={4}
              required={true}
              style={{marginTop:20, background:" rgb(35, 38, 89)", border:0, color: "rgb(255, 255, 255)",  padding:10}}
            />
          </div>
        </form>


      </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
