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

	useEffect(() => {
		exibirUsuarios();
	}, [tusId]);

	async function exibirUsuarios() {
		const response = await api.get('/adm/modusers');
		console.log(response.data);
		setUsuario(response.data);
	}

	async function exibirEspecifico(status) {
		setTusId(status);
	}

	async function mudarStatus(item) {
		try {
			const response = await api.put(
				`/adm/users/${item.usu_id}/${item.usu_status ? 0 : 1}`
			);

			if (item.usu_status) {
				toast.success('Usuário desativado.');
			} else {
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
									 <CardTitle>{tusId === 3 ? 'Adicionar Moderador' : 'Remover Moderador'}</CardTitle>
									<Row className="mt-1">
										<Col md="3" xs="5">
											<button onClick={(e) => exibirEspecifico(3)}>
												Moderadores
											</button>
										</Col>
										<Col md="3" xs="7">
											<button onClick={(e) => exibirEspecifico(1)}>
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
															<div className="subitem" style={{textAlign:'end'}}>
																<button
																	className="edit"
																	onClick={(e) => mudarStatus(item)}
																>
																	{item.tus_id === 1 ? 'Tornar Moderador' : 'Remover Moderação'}
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
