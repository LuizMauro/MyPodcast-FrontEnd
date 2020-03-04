
import React, { useRef } from 'react'
import { useDispatch}  from 'react-redux'
import { Link } from 'react-router-dom';
import { Form }  from '@unform/web'


import { signUpRequest }  from '../../store/modules/auth/actions';
import Input from '../../components/Input'


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";




export default function Cadastro(){ 

  const formRef = useRef(null);
  const dispatch =  useDispatch();

  function handleSubmit({nome, senha, email, cpf, tipoUser}){
      dispatch(signUpRequest(nome, senha, email, cpf, tipoUser));
  }

    return (
      <>
          <section className="section section-shaped section-lg">
            <Container className="pt-lg-7">
              <Row style={{justifyContent:"center"}}>
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
              
                    <CardBody className="px-lg-5 py-lg-5">
                   
                      <Form  ref={formRef} onSubmit={handleSubmit}>

                        <Row lg="12">
                            <Col xs="6">
                                <Card style={{justifyContent:"center", alignItems:"center"}}>
                                    <Button style={{width:"100%", height:"100%",background:"#232659", border:"none"}} >Ouvinte</Button>
                                </Card>
                            </Col>
                            <Col xs="6">
                                <Card style={{ justifyContent:"center", alignItems:"center"}}>
                                    <Button style={{width:"100%", height:"100%",background:"#232659"}} >Podcaster</Button>
                                </Card>
                            </Col>
                        </Row>

                        <Input className="has-success form-control" name="nome" type="text" placeholder="Nome" />
                        <Input className="has-success form-control" name="email" type="email" placeholder="Seu e-mail" />
                        <Input className="has-success form-control" name="senha" type="password" placeholder="Sua senha " />
                        <Input className="has-success form-control" name="cpf" type="text" placeholder="CPF" />
                       {/* <Input className="has-success form-control" name="tipoUser" type="text" placeholder="teste tus_id"/>*/}
                     
                        <div className="text-center">
                         <Button type="submit" className="my-4" color="primary">Entrar</Button>
                        </div>
                      </Form>
                      <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
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
