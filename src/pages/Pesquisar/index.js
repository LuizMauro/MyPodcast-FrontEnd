import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import api from '../../services/api';

import { Container } from 'reactstrap';

export default function Cadastro() {
	const [podcasts, setPodcasts] = useState([]);
	const params = useParams();

	//select = digitação do input
	//pesquisa = id da categoria
	useEffect(() => {
		console.log('req1', params.select, 'req2', params.pesquisa);
		if (!params.select && !params.pesquisa) {
			console.log('1');
			loadPodCastsAll();
		} else if (params.select && !params.pesquisa) {
			console.log('2');
		} else if (!params.select && params.pesquisa) {
			console.log('3');
		} else {
			console.log('4');
		}
	}, []);

	async function loadPodCastsAll() {
		const response = await api.get('/allpodcasts');
		setPodcasts(response.data);
		console.log(response.data);
	}

	async function loadPodCastsCategoria() {
		const response = await api.get(`/pesquisar/${params.select}`);
		setPodcasts(response.data);
	}

	async function loadPodCastsNome() {
		const response = await api.get(`/pesquisarnome/${params.pesquisa}`);
		console.log('oi');
		setPodcasts(response.data);
	}

	async function loadPodCastsCategoriaAndNome() {
		const response = await api.get(
			`/pesquisar/nome/${params.select}`,
			params.pesquisa
		);
		console.log(response.data);
		setPodcasts(response.data);
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<p className="h2 p mt-5">{podcasts.length} Resultados encontrados</p>
					<p className="h4 p">Todas as categorias</p>

					<ul
						className="d-flex py-2  flex-column flex-md-row justify-content-between"
						style={{ flexWrap: 'wrap' }}
					>
						{podcasts.map((item) => (
							<li
								className="custom-card mx-5 mb-3 flex-column"
								style={{ display: 'flex', flex: 'auto' }}
								key={item.pod_id}
							>
								<Link
									to=""
									style={{
										maxWidth: '100px',
										alignSelf: 'center',
										marginTop: 10
									}}
								>
									<img
										src={`http://localhost:3333/files/${item.pod_endereco_img}`}
										style={{ maxHeight: '100px', maxWidth: '100px' }}
										className="img-thumb"
										alt={item.pod_nome}
									/>
								</Link>
								<div
									style={{ flex: 1, padding: '5px 10px', alignSelf: 'center' }}
								>
									<Link to="#" style={{ textAlign: 'center' }}>
										<p
											style={{
												fontSize: '1rem',
												marginBottom: 0,
												fontFamily: 'inherit',
												fontWeight: 500,
												lineHeight: 1.2
											}}
										>
											{item.pod_nome}
										</p>
									</Link>
									<span className="badge bg-green m-2">
										{item.ctg_descricao}
									</span>
								</div>
							</li>
						))}
					</ul>
				</Container>
			</section>
		</>
	);
}
