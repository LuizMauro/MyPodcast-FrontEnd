
import React, { useRef } from 'react'
import { useDispatch}  from 'react-redux'
import { Link } from 'react-router-dom';
import { Form }  from '@unform/web'
// reactstrap components
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



import { logarRequest } from '../../store/modules/auth/actions'
import Input from '../../components/Input'


export default function Login(){ 

  const formRef = useRef(null);
  const dispatch = useDispatch();


 function handleSubmit({email, senha }){
  console.log(email, senha);

  dispatch(logarRequest(email, senha))
 }

    return (
      <>
          <section className="section section-shaped section-lg">
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
              
                    <CardBody className="px-lg-5 py-lg-5">
                   
                      <Form  ref={formRef} onSubmit={handleSubmit}>
                    
                        <Input className="has-success form-control" name="email" type="email" placeholder="E-mail"  />
                        <Input className="has-success form-control" name="senha" type="password" placeholder="Senha"  />
                     
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
