import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import { useSelector } from 'react-redux';
import { updateProfileRequest } from '../../store/modules/user/actions';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardText,
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
	const profile = useSelector((state) => state.user.profile);
	console.log(profile);

	function handleSubmit(data) {
		console.tron.log(data);
		console.log(data);
		dispatch(updateProfileRequest(data));
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="10">
							<Card className="bg-secondary shadow border-0">
								<CardBody className="px-lg-5 py-lg-5">
									<Form initialData={profile} onSubmit={handleSubmit}>
										<Input
											className="has-success form-control"
											name="usu_nome"
											type="text"
											placeholder="Nome"
											required
										/>
										<Input
											className="has-success form-control"
											name="usu_email"
											type="email"
											placeholder="Seu e-mail"
											required
										/>
										<hr className="hr-primary" />
										<Input
											className="has-success form-control"
											name="senhaAntiga"
											type="password"
											placeholder="Senha atual"
										/>
										<Input
											className="has-success form-control"
											name="usu_senha"
											type="password"
											placeholder="Nova senha"
										/>
										<Input
											className="has-success form-control"
											name="confirmaSenha"
											type="password"
											placeholder="Confirmar nova senha"
										/>

										<div className="text-center">
											<Button type="submit" className="my-2" color="primary">
												Editar Perfil
											</Button>
										</div>
									</Form>
									<Row className="mt-3">
										<Col sm="4">
											<Card
												body
												className="bg-secondary shadow border-secundary"
											>
												<CardTitle>Favoritos</CardTitle>
												<ul>
													<li>Podcast 1</li>
													<li>Podcast 2</li>
													<li>Podcast 3</li>
												</ul>
											</Card>
										</Col>
										<Col sm="4">
											<Card
												body
												className="bg-secondary shadow border-secundary"
											>
												<CardTitle>Acompanhando</CardTitle>
												<ul>
													<li>Podcast 1</li>
													<li>Podcast 2</li>
													<li>Podcast 3</li>
												</ul>
											</Card>
										</Col>
										<Col sm="4">
											<Card
												body
												className="bg-secondary shadow border-secundary"
											>
												<CardTitle>Pretendo Acompanhar</CardTitle>

												<ul>
													<li>Podcast 1</li>
													<li>Podcast 2</li>
													<li>Podcast 3</li>
												</ul>
											</Card>
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
