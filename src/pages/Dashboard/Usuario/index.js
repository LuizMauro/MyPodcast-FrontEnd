import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateStatusRequest } from '../../../store/modules/user/actions'
import PodcastList from '../../../styles/ItemList';
import './style.css';

import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	CardTitle,
} from 'reactstrap';

export default function Usuario() {
	const [usuario, setUsuario] = useState([]);
	const [userStatus, setUserStatus] = useState(null);
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		exibirUsuarios();
	}, [edit]);

	async function exibirUsuarios() {
		const response = await api.get('/adm/users');
		console.log(response.data);
		setUsuario(response.data);
	}

	async function exibirStatus(status) {
		setUserStatus(status);
	}

	async function mudarStatus(item) {
		try {
			dispatch(updateStatusRequest(item.usu_id, item.usu_status))

			if (item.usu_status) {
				setEdit(edit ? false : true);
				toast.success('Usuário desativado.');
			} else {
				setEdit(edit ? false : true);
				toast.success('Usuário ativado');
			}
		} catch (err) {
			toast.error('Não foi possível ativar/desativar usuário');
		}
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
											<button
												className="button"
												onClick={(e) => exibirStatus(null)}
											>
												Todos
											</button>
										</Col>
										<Col md="2" xs="4">
											<button
												className="button"
												onClick={(e) => exibirStatus(1)}
											>
												Ativados
											</button>
										</Col>
										<Col md="2" xs="4">
											<button
												className="button"
												onClick={(e) => exibirStatus(0)}
											>
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
													<PodcastList>
														<div className="subitem">{item.usu_nome}</div>
														<div className="subitem">{item.tus_descricao}</div>
														<div className="icons">
															<button
																className="button"
																onClick={(e) => mudarStatus(item)}
															>
																{item.usu_status ? 'Desativar' : 'Ativar'}
															</button>
														</div>
													</PodcastList>
												)
											) : (
												<PodcastList>
													<div className="subitem">{item.usu_nome}</div>
													<div className="subitem">{item.tus_descricao}</div>
													<div className="icons">
														<button
															className="button"
															onClick={(e) => mudarStatus(item)}
														>
															{item.usu_status ? 'Desativar' : 'Ativar'}
														</button>
													</div>
												</PodcastList>
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
