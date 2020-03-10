import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import api from '../../services/api';

import { Container } from 'reactstrap';

export default function Pesquisar() {
	const [podcasts, setPodcasts] = useState([]);
	const [categorias, setCategorias] = useState([]);
	let cate = [];
	let query = new URLSearchParams(useLocation().search);
	const select = query.get('select');

	async function loadPodCastsAll() {
		const response = await api.get('/allpodcasts');
		setPodcasts(response.data);
	}

	async function loadPodCastsCategoria(select) {
		const response = await api.get(`/pesquisar/${select}`);
		setPodcasts(response.data);
	}

	async function loadPodCastsNome(pesquisa) {
		const response = await api.get(`/pesquisarnome/${pesquisa}`);
		setPodcasts(response.data);
	}

	async function loadPodCastsCategoriaAndNome(select, pesquisa) {
		const response = await api.get(`/pesquisar/nome/${select}/${pesquisa}`);

		setPodcasts(response.data);
	}

	useEffect(() => {
		const select = query.get('select');
		const pesquisa = query.get('pesquisa');

		if (select === '' && pesquisa === '') {
			loadPodCastsAll();
		} else if (select === '' && pesquisa !== '') {
			loadPodCastsNome(pesquisa);
		} else if (select !== '' && pesquisa === '') {
			loadPodCastsCategoria(select);
		} else if (select !== '' && pesquisa !== '') {
			loadPodCastsCategoriaAndNome(select, pesquisa);
		}
	}, []);

	return (
		<>
			{console.log('ok', podcasts)}
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<p className="h2 p mt-5">{podcasts.length} Resultados encontrados</p>
					{!select && <p className="h4 p">Todas as categorias</p>}

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
									to={`podcast/${item.pod_id}`}
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
									<Link
										to={`podcast/${item.pod_id}`}
										style={{ textAlign: 'center' }}
									>
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
									<div style={{ display: 'none' }}>
										{(cate = item.ctg_descricao.split(','))}
										{}
									</div>
									{cate.map((cat) => (
										<span className="badge bg-green m-2">{cat}</span>
									))}
								</div>
							</li>
						))}
					</ul>
				</Container>
			</section>
		</>
	);
}
