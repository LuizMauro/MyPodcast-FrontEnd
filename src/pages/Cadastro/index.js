import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { IoMdMicrophone, IoMdHeadset } from 'react-icons/io';
import { signUpRequest } from '../../store/modules/auth/actions';
import Input from '../../components/Input';

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
} from 'reactstrap';

export default function Cadastro() {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const [tusId, setTusId] = useState('');

	function handleSubmit({ nome, senha, email, cpf }) {
		if (tusId != '') {
			console.log(tusId);
			dispatch(signUpRequest(nome, senha, email, cpf, tusId));
		}
	}

	function setProfile(id) {
		setTusId(id);
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="5">
							<Card className="bg-secondary shadow border-0">
								<CardBody className="px-lg-5 py-lg-5">
									<Form ref={formRef} onSubmit={handleSubmit}>
										<Row lg="12" className="mb-3">
											<Col xs="6">
												<Button
													style={{
														width: '100%',
														height: '100%',
														background: '#232659',
														border: 'none',
														padding: '10px 0 10px 0',
														color: '#1BFDBE'
													}}
													onClick={() => setProfile(1)}
												>
													<IoMdHeadset size={40} />
													<p className="mt-2">Ouvinte</p>
												</Button>
											</Col>
											<Col xs="6">
												<Button
													style={{
														width: '100%',
														height: '100%',
														background: '#232659',
														border: 'none',
														padding: '10px 0 10px 0',
														color: '#1BFDBE'
													}}
													onClick={() => setTusId(2)}
												>
													<IoMdMicrophone size={40} />
													<p className="mt-2">Podcaster</p>
												</Button>
											</Col>
										</Row>

										<Input
											className="has-success form-control"
											name="nome"
											type="text"
											placeholder="Nome"
										/>
										<Input
											className="has-success form-control"
											name="email"
											type="email"
											placeholder="Seu e-mail"
										/>
										<Input
											className="has-success form-control"
											name="senha"
											type="password"
											placeholder="Sua senha "
										/>
										<Input
											className="has-success form-control"
											name="cpf"
											type="text"
											placeholder="CPF"
										/>
										{/* <Input className="has-success form-control" name="tipoUser" type="text" placeholder="teste tus_id"/>*/}

										<div className="text-center">
											<Button type="submit" className="my-2" color="primary">
												Cadastrar
											</Button>
										</div>
									</Form>
									<Row className="mt-1">
										<Col xs="6">
											<a
												className="text-light"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<small>Esqueci a senha</small>
											</a>
										</Col>
										<Col className="text-right" xs="6">
											<a
												className="text-light"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
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
