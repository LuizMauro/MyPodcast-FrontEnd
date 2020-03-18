import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import Input from '../../../components/Input';
import FileInput from '../../../components/FileInput/FileInput';
import PodcastList from '../../../styles/ItemList';
import { FaPen, FaTimes } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './style.css';

import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	CardTitle
} from 'reactstrap';

export default function EditarPodcast() {
	const [usuario, setUsuario] = useState([]);
	const [userFiltrado, setUserFiltrado] = useState([]);
	const [userStatus, setUserStatus] = useState(null);

	useEffect(() => {
		exibirUsuarios();
	}, [userStatus]);

	async function exibirUsuarios() {
		const response = await api.get('/adm/users');
		console.log(response.data);
		setUsuario(response.data);
	}

	async function exibirStatus(status) {
		setUserStatus(status);
	}

	return (
		<>
			{console.log(usuario)}
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="12">
							<Card className="bg-secondary shadow border-0">
								<CardBody
									className="px-lg-5 py-lg-5"
									enctype="multipart/form-data"
								>
									<CardTitle>Usuários do Sistema</CardTitle>
									<Row className="mt-1">
										<Col md="2" xs="4">
											<button onClick={(e) => exibirStatus(null)}>Todos</button>
										</Col>
										<Col md="2" xs="4">
											<button onClick={(e) => exibirStatus(1)}>Ativados</button>
										</Col>
										<Col md="2" xs="4">
											<button onClick={(e) => exibirStatus(0)}>
												Desativados
											</button>
										</Col>
										<Col className="text-right" xs="6"></Col>
									</Row>
									<Row className="my-3">
										<Col xs="6">Usuário</Col>
										<Col xs="6">Perfil</Col>
										<Col className="text-right" xs="6"></Col>
									</Row>
									<ul>
										{console.log('status é', userStatus)}
										{usuario.map((item) =>
											userStatus === 1 || userStatus === 0 ? (
												userStatus === item.usu_status && (
													<h1>
														<PodcastList>
															<div className="subitem">
																<Link
																	to={`../../../podcast/${item.pod_id}`}
																	className="linktittle"
																>
																	{item.usu_nome}
																</Link>
															</div>
															<div className="subitem">
																<Link
																	to={`../../../podcast/${item.pod_id}`}
																	className="linktittle"
																>
																	{item.tus_descricao}
																</Link>
															</div>
															<div className="icons">
												<button className="edit">{item.usu_status ? 'Desativar' : 'Ativar'}</button>
															</div>
														</PodcastList>
													</h1>
												)
											) : (
												<h1>
													<PodcastList>
														<div className="subitem">
															<Link
																to={`../../../podcast/${item.pod_id}`}
																className="linktittle"
															>
																{item.usu_nome}
															</Link>
														</div>
														<div className="subitem">
															<Link
																to={`../../../podcast/${item.pod_id}`}
																className="linktittle"
															>
																{item.tus_descricao}
															</Link>
														</div>
														<div className="icons">
															<button className="edit">{item.usu_status ? 'Desativar' : 'Ativar'}</button>
														</div>
													</PodcastList>
												</h1>
											)
										)}
									</ul>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
