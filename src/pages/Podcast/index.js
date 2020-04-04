import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Menu from '../../components/Menu';
import api from '../../services/api';
import { FaSpotify, FaInternetExplorer, FaYoutube } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';

import { useSelector } from 'react-redux';

// reactstrap components
import { Container, Input, Button } from 'reactstrap';

export default function Podcast() {
	const { pod_id } = useParams();
	const [podcast, setPodcast] = useState('');
	const [categoria, setCategoria] = useState([]);
	const [endereco, setEndereco] = useState([]);
	const [opcao, setOpcao] = useState('');

	const profile = useSelector((state) => state.user.profile);

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

	async function favoritar() {
		console.log(profile);
		if (profile) {
			const verifica = await api.get(`findfavorito/${pod_id}`);
			console.log(verifica.data);

			if (verifica.data.fbk_status === 1) {
				await api.put(`profile/favoritar/${pod_id}`);
				console.log('vc desfavoritou');
			} else {
				console.log('vc favoritou');
				await api.post(`${pod_id}/favoritar`);
			}
		} else {
			console.log('n ta logado n pode favorita ');
		}
	}

	async function marcarPodcast(e) {
		if (profile) {
			const verifica = await api.get(`acompanhando/${pod_id}`);
			console.log('status é', verifica.data.fbk_status);

			if (verifica.data.fbk_status === 0) {
				//Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)

				await api.put(`acompanhando/${pod_id}/${e}`);
				console.log('sou o 0');
			} else if (verifica.data.fbk_status === 1) {
				//Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
				await api.put(`acompanhando/${pod_id}/${e}`);
				console.log('sou o 1');
			} else if (verifica.data.fbk_status === 2) {
				//Se caiu aqui é porque ja marcou e tá mudando a opção (Botao com outro status)
				await api.put(`acompanhando/${pod_id}/${e}`);
				console.log('sou o 2');
			} else if (!verifica.data.fbk_status) {
				//Se não marcou ainda, marca podcast por aqui pelo status vindo do botao

				if (e === 1) {
					// Marcar como acompanhando
					await api.post(`${pod_id}/acompanhando`);
				} else if (e === 2) {
					// Marcar como pretendo acompanhar
					await api.post(`${pod_id}/acompanhar`);
				} else {
					console.log('nao tem como marcar como nao marcado');
				}
			}

			setOpcao(e);
			console.log(e);
		} else {
			console.log('n tá lotado n pode marca');
		}
	}

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
								src={`http://localhost:3333/files/${podcast.pod_endereco_img}`}
							/>
							<h2 style={{ color: '#fff' }}>Nota: 5.9</h2>
						</div>

						<div style={{ padding: 20, display: 'flex' }}>
							<IoIosHeart
								size={50}
								style={{ cursor: 'pointer' }}
								color="#FF3144"
								className="shadow"
								onClick={() => favoritar()}
							/>
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

						<div
							style={{ padding: 2, display: 'flex', flexDirection: 'column' }}
						>
							<Button
								style={{
									width: '50%',
									height: '60%',
									background: '#232659',
									border: 'none',
									color: '#1BFDBE',
									marginBottom: 5,
									padding: 0
								}}
								onClick={(e) => marcarPodcast(1)}
							>
								<p>Acompanhando</p>
							</Button>
							<Button
								style={{
									width: '50%',
									height: '60%',
									background: '#232669',
									border: 'none',
									color: '#1BFDBE',
									marginBottom: 5,
									padding: 0
								}}
								onClick={(e) => marcarPodcast(2)}
							>
								<p>Pretendo Acompanhar</p>
							</Button>
							<Button
								style={{
									width: '50%',
									height: '60%',
									background: '#232669',
									border: 'none',
									color: '#1BFDBE',
									marginBottom: 5,
									padding: 0
								}}
								onClick={(e) => marcarPodcast(0)}
							>
								<p className={'mt-2'}>Nada</p>
							</Button>
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
								<h5 style={{ color: '#fff' }}>Ano de criação</h5>
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
								<h5 style={{ color: '#fff' }}>Média de Duração</h5>
								<p>{podcast.pod_duracao}min</p>
							</div>
						</div>

						<div className="p-3" style={{ height: 'auto', flex: 1 }}>
							<h5 style={{ color: '#fff' }}>Disponivel em</h5>
							<div style={{ display: 'flex', flexDirection: 'row' }}>
								{endereco.map((item) => ( 
									item.includes('.com') && (<div style={{ padding: 5, margin: 5 }}>
										<a target="_blank" href={item}>
											{item.includes('spotify.com') ? (
												<FaSpotify style={{ color: '#1DB954	' }} size={50} />
											) : item.includes('youtube.com') ? (
												<FaYoutube
													style={{ color: 'ff0000' }}
													size={50}
												/>
											) : (
												<FaInternetExplorer
													style={{ color: '#0f7aca' }}
													size={50}
												/>
											)}
										</a>
									</div>) 
									
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
