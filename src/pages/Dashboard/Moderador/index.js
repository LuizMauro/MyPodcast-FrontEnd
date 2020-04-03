import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import PodcastList from '../../../styles/ItemList';
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

export default function Moderador() {
	const [usuario, setUsuario] = useState([]);
	const [tusId, setTusId] = useState(3);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		exibirUsuarios();
	}, [edit]);

	async function exibirUsuarios() {
		const response = await api.get('/adm/modusers');
		console.log(response.data);
		setUsuario(response.data);
	}

	async function exibirEspecifico(status) {
		setTusId(status);
	}

	async function mudarTusId(item) {
		try {
			await api.put(
				`/adm/users/tipo/${item.usu_id}/${item.tus_id === 3 ? 1 : 3}`
			);

			if (item.tus_id === 3) {
				setEdit(edit ? false : true);
				toast.success('O usuário não é mais moderador');
			} else {
				setEdit(edit ? false : true);
				toast.success('O usuário agora é moderador');
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
									<CardTitle>
										{tusId === 3
											? 'Moderadores do Sistema'
											: 'Adicionar Moderador'}
									</CardTitle>
									<Row className="mt-1">
										<Col md="3" xs="5">
											<button
												className={'button',tusId === 3 ? 'activated' : ''}
												onClick={(e) => exibirEspecifico(3)}
											>
												Moderadores
											</button>
										</Col>
										<Col md="5" xs="7">
											<button
												className={'button',tusId === 1 ? 'activated' : ''}
												onClick={(e) => exibirEspecifico(1)}
											>
												Adicionar Moderador
											</button>
										</Col>
										<Col className="text-right" xs="6"></Col>
									</Row>
									<ul className="my-3">
										{console.log('status é', tusId)}
										{usuario.map(
											(item) =>
												tusId === item.tus_id && (
													<h1>
														<PodcastList>
															<div className="item">
																<Link
																	to={`../../../podcast/${item.pod_id}`}
																	className="linktittle"
																>
																	{item.usu_nome}
																</Link>
															</div>
															<div
																className="subitem"
																style={{ textAlign: 'end' }}
															>
																<button 
																	className="edit button"
																	onClick={(e) => mudarTusId(item)}
																>
																	{item.tus_id === 1
																		? 'Tornar Moderador'
																		: 'Remover Moderação'}
																</button>
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
