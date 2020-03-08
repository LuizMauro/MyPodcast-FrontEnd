import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { FaSpotify, FaInternetExplorer } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';

// reactstrap components
import { Container, Input } from 'reactstrap';

export default function Podcast() {
	const { pod_id } = useParams();
	const [podcast, setPodcast] = useState('');
	const [categoria, setCategoria] = useState([]);
	const [endereco, setEndereco] = useState([]);

	async function loadPodcast() {
		console.log('TESTE', pod_id);
		const response = await api.get(`/podcast/${pod_id}`);
		setPodcast(response.data);

		const { ctg_descricao, end_link } = response.data;
		setCategoria(ctg_descricao.split(','));
		setEndereco(end_link.split(','));

		console.log('TESTE', response.data);
	}

	useEffect(() => {
		loadPodcast();
		console.log(podcast);
	}, []);

	return (
		<>
			<Menu></Menu>

			<Container>
				<div
					className="bg-secondary shadow"
					style={{
						marginTop: '5%',
						display: 'flex',
						flexWrap: 'wrap',
						marginBottom: 50
					}}
				>
					<div
						style={{
							height: 'auto',
							minWidth: 300,
							display: 'flex',
							flexDirection: 'column'
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
								src="https://img.freepik.com/fotos-gratis/gotas-de-oleo-na-imagem-abstrata-padrao-psicodelico-de-agua_23-2148290141.jpg?size=626&ext=jpg"
							/>
							<h2 style={{ color: '#fff' }}>Nota: 5.9</h2>
						</div>

						<div style={{ padding: 20, display: 'flex' }}>
							<IoIosHeart size={50} color="#FF3144" className="shadow" />
							<Input
								className="select-home shadow"
								style={{ color: '#fff' }}
								type="select"
								name="select"
								id="exampleSelect"
								placeholder="Selecione"
							>
								<option>Avaliar</option>
							</Input>
						</div>

						<div style={{ padding: 5, display: 'flex' }}>
							<Input
								className="select-home shadow"
								style={{ color: '#fff' }}
								type="select"
								name="select"
								id="exampleSelect"
								placeholder="Selecione"
							>
								<option>Marcar como</option>
							</Input>
						</div>
					</div>
					<div
						style={{
							minWidth: 300,
							flex: 1,
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						<div style={{ flex: 1 }} className="borderBottom p-3">
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
											color: '#fff'
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

						<div style={{ flex: 1, display: 'flex' }} className="borderBottom">
							<div
								style={{
									margin: 20,
									borderRadius: 5,
									color: '#fff'
								}}
							>
								<h5 style={{ color: '#fff' }}>Ano criacao</h5>
								<p>{podcast.pod_anocriacao}</p>
							</div>
							<div
								style={{
									margin: 20,
									borderRadius: 5,
									color: '#fff'
								}}
							>
								<h5 style={{ color: '#fff' }}>Podcaster</h5>
								<p>{podcast.pod_criador}</p>
							</div>
							<div
								style={{
									margin: 20,
									borderRadius: 5,
									color: '#fff'
								}}
							>
								<h5 style={{ color: '#fff' }}>Tempo Medio de duraçao</h5>
								<p>05 horas</p>
							</div>
						</div>

						<div className="p-3" style={{ height: 'auto', flex: 1 }}>
							<h5 style={{ color: '#fff' }}>Disponivel em</h5>
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								{endereco.map((item) => (
									<div style={{ padding: 5, margin: 5 }}>
										<a target="_blank" href={item}>
											<FaInternetExplorer
												style={{ color: '#0f7aca' }}
												size={50}
											/>
										</a>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
