import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../../services/api';
import { toast } from 'react-toastify';

import Input from '../../../components/Input';
import FileInput from '../../../components/FileInput/FileInput';

import { Button, Card, CardBody, Container, Row, Col } from 'reactstrap';

export default function Podcast() {
	const formRef = useRef(null);
	const [file, setFile] = useState(null);

	async function handleSubmit({
		pod_nome,
		pod_descricao,
		pod_criador,
		pod_anocriacao,
		pod_duracao,
		ctg_id,
		end_link1,
		end_link2,
		end_link3
	}) {

		const list_of_categoria = ctg_id.split(',');

		if(list_of_categoria.length > 5){
			toast.error('O podcast pode ter no máximo 5 categorias')
			return;
		}

		const data = new FormData();

		data.append('pod_nome', pod_nome);
		data.append('pod_descricao', pod_descricao);
		data.append('pod_criador', pod_criador);
		data.append('pod_anocriacao', pod_anocriacao);
		data.append('pod_duracao', pod_duracao);
		data.append('pod_permissao', 1);
		data.append('list_of_categoria', list_of_categoria);
		data.append('end_link1', end_link1);
		data.append('end_link2', end_link2);
		data.append('end_link3', end_link3);
		data.append('file', file);

		try {
			const schema = Yup.object().shape({
				pod_nome: Yup.string().required('O nome do Podcast obrigatória'),
				pod_descricao: Yup.string().required(
					'A descrição do Podcast é obrigatória'
				),
				pod_criador: Yup.string().required('O nome do criador é obrigatório'),
				pod_anocriacao: Yup.string().required('O ano de criação é obrigatório'),
				pod_duracao: Yup.string().required('A duração é obrigatório'),
				ctg_id: Yup.string().required('As categorias são obrigatórias'),
				end_link1: Yup.string().required('O 1º endereço é obrigatório')
			});

		/*	await schema.validate(
				{ pod_nome },
				{ pod_descricao },
				{ pod_criador },
				{ pod_anocriacao },
				{ pod_duracao },
				{ ctg_id },
				{ end_link1 },
				{
					abortEarly: false
				}
			); */

			const response = await api.post('/adm/criarpodcast', data);

			if(response.data.podCreated){
				toast.success('Podcast cadastrado!');
				console.log(response.data);
			}else if(response.data.nomeExists){
				toast.error('Nome de Podcast já cadastrado')
			}
			console.log(response.data);

			formRef.current.setErrors(false);
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				const errorMessages = {};

				err.inner.forEach((error) => {
					errorMessages[error.path] = error.message;
				});

				console.log(errorMessages);

				formRef.current.setErrors(errorMessages);
			}
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
									<Form ref={formRef} onSubmit={handleSubmit}>
										<Row lg="12" className="mb-3"></Row>

										<Input
											name="pod_nome"
											type="text"
											placeholder="Nome do Podcast"
										/>
										<Input
											name="pod_descricao"
											type="text"
											placeholder="Descrição do Podcast"
										/>
										<Input
											name="pod_criador"
											type="text"
											placeholder="Nome do criador"
										/>
										<Input
											name="pod_anocriacao"
											type="text"
											placeholder="Ano de criação"
										/>
										<Input
											name="pod_duracao"
											type="text"
											placeholder="Média de duração em minutos"
										/>
										<Input
											name="ctg_id"
											type="text"
											placeholder="Categorias separadas por vírgula"
										/>
										<Input
											name="end_link1"
											type="text"
											placeholder="Endereço 1 do Podcast"
										/>
										<Input
											name="end_link2"
											type="text"
											placeholder="Endereço 2 do Podcast"
										/>
										<Input
											name="end_link3"
											type="text"
											placeholder="Endereço 3 do Podcast"
										/>
										<FileInput
											name="pod_endereco_img"
											type="file"
											id="pod_endereco_img"
											accept="image/*"
											data-file={file}
											onChange={(event) => setFile(event.target.files[0])}
										></FileInput>

										<div className="text-center">
											<Button type="submit" className="my-2" color="primary">
												Cadastrar
											</Button>
										</div>
									</Form>
									<Row className="mt-1">
										<Col xs="6">
											<a
												className="text-light"
												href="#"
												onClick={(e) => e.preventDefault()}
											></a>
										</Col>
										<Col className="text-right" xs="6"></Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
}
