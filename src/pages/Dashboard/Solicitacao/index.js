import React, { useRef, useState, useEffect } from 'react';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateSolicitacaoRequest } from '../../../store/modules/podcast/actions'

import PodcastCard from '../../../styles/ItemCard';

import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	CardTitle,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

export default function Solicitacao() {
	const [solicitacao, setSolicitacao] = useState([]);
	const [podcast, setPodcast] = useState([]);
	const [categoria, setCategoria] = useState([]);
	const [endereco, setEndereco] = useState([]);
	const [modal, setModal] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		exibirSolicitacoes();
	}, [modal]);

	async function toggle(item) {
		setPodcast(item);
		if (!modal) {
			setCategoria(item.ctg_descricao.split(','));
			setEndereco(item.end_link.split(','));
		}

		setModal(!modal);
	}

	async function exibirSolicitacoes() {
		const response = await api.get('/podcasts/solicitacao');
		console.log(response.data);
		setSolicitacao(response.data);
	}

	async function permitir(pod_id, pod_permissao) {
		try {
			dispatch(updateSolicitacaoRequest(pod_id,pod_permissao))

			if (pod_permissao === 1) {
				toast.success('Cadastro de Podcast permitido');
			} else {
				toast.success('Cadastro de Podcast recusado');
			}
		} catch (err) {
			toast.success('Falha ao tentar aprovar/recusar Podcast');
		}

		console.log('id é', pod_id);
		console.log('permissão é', pod_permissao);
		setModal(!modal);
	}

	return (
		<>
			{console.log(solicitacao)}
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="12">
							<Card className="bg-secondary shadow border-0">
								<CardBody
									className="px-lg-5 py-lg-5"
									enctype="multipart/form-data"
								>
									<CardTitle>Solicitações de Cadastro</CardTitle>
									{solicitacao.length > 0 ? (
										<PodcastCard className="solicitacoes">
											{solicitacao.map((item) => (
												<li>
													<div className="card_content">
														<p>{item.pod_nome}</p>
													</div>
													<div className="card_info">
														<div className="description">
															<p>Usuário</p>
															<p>{item.usu_nome}</p>
														</div>
														<button
															className="button"
															style={{ color: '#151734' }}
															onClick={(e) => toggle(item)}
														>
															Detalhes
														</button>
													</div>
												</li>
											))}
										</PodcastCard>
									) : (
										<h2 style={{ textAlign: 'center' }}>
											Nenhuma solicitação de cadastro no momento.
										</h2>
									)}
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>

				<div style={!modal ? { display: 'none' } : { display: 'block' }}>
					>
					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle}>Solicitação de Cadastro</ModalHeader>
						<ModalBody>
							<div
								className="bg-secondary shadow"
								style={{
									marginTop: '5%',
									display: 'flex',
									flexWrap: 'wrap',
									marginBottom: 50,
								}}
							>
								<div
									style={{
										height: 'auto',
										minWidth: 300,
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<div
										style={{ height: 350, width: 400, padding: 20 }}
										className="borderBottom"
									>
										<img
											className="shadow"
											width="100%"
											height="100%"
											style={{ borderRadius: 10 }}
											src={`http://localhost:3333/files/${podcast.pod_endereco_img}`}
										/>
									</div>

									<div
										style={{
											padding: 2,
											display: 'flex',
											flexDirection: 'column',
										}}
									></div>
								</div>
								<div
									style={{
										minWidth: 300,
										flex: 1,
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<div style={{ flex: 1 }} className="px-3">
										<h2 style={{ color: '#fff', marginTop: 20 }}>
											{podcast.pod_nome}
										</h2>
									</div>

									<div
										style={{ height: 'auto', flex: 1 }}
										className="borderBottom p-3"
									>
										<h5 style={{ color: '#fff' }}>Categorias</h5>
										<div style={{ display: 'flex', flexDirection: 'row' }}>
											{categoria.map((cat) => (
												<div
													style={{
														padding: 5,
														margin: 5,
														backgroundColor: '#212454',
														borderRadius: 5,
														color: '#fff',
													}}
												>
													{cat}
												</div>
											))}
										</div>
									</div>

									<div style={{ flex: 1 }} className="borderBottom p-3">
										<p style={{ color: '#fff', textAlign: 'justify' }}>
											{podcast.pod_descricao}
										</p>
									</div>

									<div style={{ flex: 1 }} className="borderBottom">
										<div
											style={{
												margin: 20,
												borderRadius: 5,
												color: '#fff',
											}}
										>
											<h5 style={{ color: '#fff' }}>Ano de criação</h5>
											<p>{podcast.pod_anocriacao}</p>
										</div>
										<div
											style={{
												margin: 20,
												borderRadius: 5,
												color: '#fff',
											}}
										>
											<h5 style={{ color: '#fff' }}>Podcaster</h5>
											<p>{podcast.pod_criador}</p>
										</div>
										<div
											style={{
												margin: 20,
												borderRadius: 5,
												color: '#fff',
											}}
										>
											<h5 style={{ color: '#fff' }}>Média de Duração</h5>
											<p>{podcast.pod_duracao}min</p>
										</div>
									</div>

									<div className="p-3" style={{ height: 'auto', flex: 1 }}>
										<h5 style={{ color: '#fff' }}>Disponivel em</h5>
										<div style={{ display: 'grid' }}>
											{endereco.map((endereco) => (
												<a href={endereco} target="_blank">
													{endereco}
												</a>
											))}
										</div>
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="primary"
								onClick={(e) => permitir(podcast.pod_id, 1)}
							>
								Aceitar Cadastro
							</Button>{' '}
							<Button
								color="secondary"
								onClick={(e) => permitir(podcast.pod_id, 2)}
							>
								Recusar Cadastro
							</Button>
						</ModalFooter>
					</Modal>
				</div>
			</section>
		</>
	);
}
