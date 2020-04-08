import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateCategoriaRequest } from '../../../../store/modules/categoria/actions';

import Input from '../../../../components/Input';
import PodcastList from '../../../../styles/ItemList';
import { FaPen, FaTimes, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	CardTitle,
} from 'reactstrap';

export default function EditarPodcast() {
	const [editMode, setEditMode] = useState(false);
	const formRef = useRef(null);
	const [categorias, setCategorias] = useState([]);
	const [editarCat, setEditarCat] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		exibirCategorias();
	}, [editMode]);

	async function exibirCategorias() {
		const response = await api.get('/categoria');
		console.log(response.data);
		setCategorias(response.data);
	}


	async function editarCategoria(categoria) {
		setEditMode(true);
		setEditarCat(categoria);
	}

	async function handleSubmit({ ctg_descricao }) {
		const ctgid = editarCat.ctg_id;

		const data = new FormData();

		data.append('ctg_descricao', ctg_descricao);

		try {
			dispatch(updateCategoriaRequest(ctg_descricao,ctgid))
		} catch (err) {
			toast.error('Não foi possível editar categoria');
		}
	}

	return (
		<>
			<section className="section section-shaped section-lg">
				<Container className="pt-lg-1">
					<Row style={{ justifyContent: 'center' }}>
						<Col lg="12">
							<Card className="bg-secondary shadow border-0">
								<CardBody
									className="px-lg-5 py-lg-5"
									enctype="multipart/form-data"
								>
									<Row
										style={
											editMode
												? { display: 'none' }
												: { display: 'flex', justifyContent: 'flex-end' }
										}
									>
										<Col lg="6">
											<p>Buscar</p>
										</Col>
										<Col lg="6" style={{ textAlign: 'end' }}>
											<Link
												className="btn btn-primary"
												to="categorias/cadastrar"
											>
												<FaPlus size={18} /> Categoria
											</Link>
										</Col>
									</Row>
									<CardTitle>
										{editMode ? 'Editar Categoria' : 'Categorias Cadastradas'}
									</CardTitle>

									<MdClose
										size={24}
										color={'#fff'}
										className="closeIcon"
										style={
											editMode ? { display: 'block' } : { display: 'none' }
										}
										onClick={() => setEditMode(false)}
									/>
									<ul
										style={
											editMode ? { display: 'none' } : { display: 'block' }
										}
									>
										{categorias.map((item) => (
											<PodcastList>
												<div className="item">{item.ctg_descricao}</div>
												<div className="icons">
													<button
														className="button edit"
														style={{right:0}}
														onClick={(e) => editarCategoria(item)}
													>
														<FaPen size={18} />
													</button>
												</div>
											</PodcastList>
										))}
									</ul>

									<Form
										ref={formRef}
										onSubmit={handleSubmit}
										initialData={editarCat}
										style={
											editMode ? { display: 'block' } : { display: 'none' }
										}
									>
										<Input
											name="ctg_descricao"
											type="text"
											placeholder="Descrição da Categoria"
										/>

										<div className="text-center">
											<Button type="submit" className="my-2" color="primary">
												Salvar Alterações
											</Button>
										</div>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
