import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { Form } from '@unform/web';
import Input from '../../components/Input';

import api from '../../services/api';

import { useSelector } from 'react-redux';
import { updateProfileRequest } from '../../store/modules/user/actions';

import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Container,
	Row,
	Col
} from 'reactstrap';

export default function Cadastro() {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.user.profile);
	console.log(profile);

	useEffect(() => {}, [profile]);

	function handleSubmit(data) {
		dispatch(updateProfileRequest(data));
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<p className="h2 p mt-5">5 Resultados encontrados</p>
					<p className="h4 p">Todas as categorias</p>

					<div
						className="d-flex py-2  flex-column flex-md-row justify-content-between"
						style={{flexWrap: 'wrap' }}
					>


						<div
							className="custom-card mx-5 mb-3 flex-column"
							style={{ display: 'flex', flex: 'auto' }}
						>
							<Link to="" style={{ maxWidth: '100px', alignSelf:'center', marginTop:10 }}>
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6b/06/fd/6b06fdbd-07b0-032e-7f4d-ea7c40995278/mza_3169076889313867971.jpg/400x400bb.jpg"
									style={{ maxHeight: '100px', maxWidth: '100px' }}
									className="img-thumb"
									alt="#"
								/>
							</Link>
							<div style={{ flex: 1, padding: '5px 10px', alignSelf:'center' }}>
								<Link to="#" style={{textAlign:'center'}}>
									<p
										style={{
											fontSize: '1rem',
											marginBottom: 0,
											fontFamily: 'inherit',
											fontWeight: 500,
											lineHeight: 1.2
										}}
									>
										Nerdcast
									</p>
								</Link>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
							</div>
						</div>







						<div
							className="custom-card mx-5 mb-3 flex-column"
							style={{ display: 'flex', flex: 'auto' }}
						>
							<Link to="" style={{ maxWidth: '100px', alignSelf:'center', marginTop:10 }}>
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6b/06/fd/6b06fdbd-07b0-032e-7f4d-ea7c40995278/mza_3169076889313867971.jpg/400x400bb.jpg"
									style={{ maxHeight: '100px', maxWidth: '100px' }}
									className="img-thumb"
									alt="#"
								/>
							</Link>
							<div style={{ flex: 1, padding: '5px 10px', alignSelf:'center' }}>
								<Link to="#" style={{textAlign:'center'}}>
									<p
										style={{
											fontSize: '1rem',
											marginBottom: 0,
											fontFamily: 'inherit',
											fontWeight: 500,
											lineHeight: 1.2
										}}
									>
										Nerdcast
									</p>
								</Link>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
							</div>
						</div>










						<div
							className="custom-card mx-5 mb-3 flex-column"
							style={{ display: 'flex', flex: 'auto' }}
						>
							<Link to="" style={{ maxWidth: '100px', alignSelf:'center', marginTop:10 }}>
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6b/06/fd/6b06fdbd-07b0-032e-7f4d-ea7c40995278/mza_3169076889313867971.jpg/400x400bb.jpg"
									style={{ maxHeight: '100px', maxWidth: '100px' }}
									className="img-thumb"
									alt="#"
								/>
							</Link>
							<div style={{ flex: 1, padding: '5px 10px', alignSelf:'center' }}>
								<Link to="#" style={{textAlign:'center'}}>
									<p
										style={{
											fontSize: '1rem',
											marginBottom: 0,
											fontFamily: 'inherit',
											fontWeight: 500,
											lineHeight: 1.2
										}}
									>
										Nerdcast
									</p>
								</Link>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
							</div>
						</div>










						<div
							className="custom-card mx-5 mb-3 flex-column"
							style={{display: 'flex', flex: 'auto'}}
						>
							<Link to="" style={{ maxWidth: '100px', alignSelf:'center', marginTop:10 }}>
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6b/06/fd/6b06fdbd-07b0-032e-7f4d-ea7c40995278/mza_3169076889313867971.jpg/400x400bb.jpg"
									style={{ maxHeight: '100px', maxWidth: '100px' }}
									className="img-thumb"
									alt="#"
								/>
							</Link>
							<div style={{ flex: 1, padding: '5px 10px', alignSelf:'center' }}>
								<Link to="#" style={{textAlign:'center'}}>
									<p
										style={{
											fontSize: '1rem',
											marginBottom: 0,
											fontFamily: 'inherit',
											fontWeight: 500,
											lineHeight: 1.2
										}}
									>
										Nerdcast
									</p>
								</Link>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
							</div>
						</div>






						<div
							className="custom-card mx-5 mb-3 flex-column"
							style={{display: 'flex', flex: 'auto' }}
						>
							<Link to="" style={{ maxWidth: '100px', alignSelf:'center', marginTop:10 }}>
								<img
									src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/6b/06/fd/6b06fdbd-07b0-032e-7f4d-ea7c40995278/mza_3169076889313867971.jpg/400x400bb.jpg"
									style={{ maxHeight: '100px', maxWidth: '100px' }}
									className="img-thumb"
									alt="#"
								/>
							</Link>
							<div style={{ flex: 1, padding: '5px 10px', alignSelf:'center' }}>
								<Link to="#" style={{textAlign:'center'}}>
									<p
										style={{
											fontSize: '1rem',
											marginBottom: 0,
											fontFamily: 'inherit',
											fontWeight: 500,
											lineHeight: 1.2
										}}
									>
										Nerdcast
									</p>
								</Link>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
								<span className="badge bg-green m-2">Filmes</span>
							</div>
						</div>
					</div>
					
				</Container>
			</section>
		</>
	);
}
