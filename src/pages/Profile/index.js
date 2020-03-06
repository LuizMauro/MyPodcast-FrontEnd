import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import api from '../../services/api';

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
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.user.profile);
	const [podcast, setPodcast] = useState([]);
	const [editMode, setEditMode] = useState(false);
	console.log(profile);

	useEffect(() => {
		exibirPodcasts();
	}, []);

	async function exibirPodcasts() {
		const response = await api.get('/profile');
		setPodcast(response.data);
	}

	function handleSubmit(data) {
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
									<Form
										initialData={profile}
										onSubmit={handleSubmit}
										style={
											!editMode ? { display: 'none' } : { display: 'default' }
										}
									>
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
												Salvar
											</Button>
										</div>
									</Form>

									<div
										style={
											editMode ? { display: 'none' } : { display: 'default' }
										}
									>
										<p>Nome de Usuário: {profile.usu_nome}</p>
										<p>E-mail: {profile.usu_email} </p>
										<p>CPF: {profile.usu_cpf}</p>

										<div className="text-center">
											<Button
												className="my-2"
												color="primary"
												onClick={() => setEditMode(true)}
											>
												Editar Perfil
											</Button>
										</div>
									</div>

									<Row className="mt-3">
										<Col sm="4">
											<Card
												style={{
													borderRadius: 15,
													background: '#151734'
												}}
												className="teste card-body mb-3"
											>
												<CardTitle className="title-primary">
													Favoritos
												</CardTitle>
												<ul>
													{podcast.map((pod) => (
														<li key={podcast.fbk_id}>
															{pod.tfb_id === 1 && pod.pod_nome}
														</li>
													))}
												</ul>
											</Card>
										</Col>
										<Col sm="4">
											<Card
												style={{
													borderRadius: 15,
													background: '#151734'
												}}
												className="teste card-body mb-3"
											>
												<CardTitle className="title-primary">
													Acompanhando
												</CardTitle>
												<ul>
													{podcast.map((pod) => (
														<li key={podcast.fbk_id}>
															{pod.tfb_id === 2 &&
																pod.fbk_status === 1 &&
																pod.pod_nome}
														</li>
													))}
												</ul>
											</Card>
										</Col>
										<Col sm="4">
											<Card
												style={{
													borderRadius: 15,
													background: '#151734'
												}}
												className="teste card-body mb-3"
											>
												<CardTitle className="title-primary">
													Pretendo Acompanhar
												</CardTitle>
												<ul>
													{podcast.map((pod) => (
														<li key={podcast.fbk_id}>
															{pod.tfb_id === 2 &&
																pod.fbk_status === 2 &&
																pod.pod_nome}
														</li>
													))}
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
