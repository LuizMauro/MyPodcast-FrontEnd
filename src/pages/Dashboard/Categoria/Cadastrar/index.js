import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import api from '../../../../services/api';
import { toast } from 'react-toastify';

import Input from '../../../../components/Input';

import { Button, Card, CardBody, Container, Row, Col } from 'reactstrap';

export default function Categoria() {
	const formRef = useRef(null);

	async function handleSubmit({ ctg_descricao, reset }) {
		try {
			const schema = Yup.object().shape({
				ctg_descricao: Yup.string().required('A categoria é obrigatória'),
			});

			await schema.validate(
				{ ctg_descricao },
				{
					abortEarly: false,
				}
			);

			const response = await api.post('/adm/categoria', { ctg_descricao });

			if (response.data.ctgExists) {
				toast.error('Categoria já cadastrada!');
			} else if (response.data.ctgCreated) {
				toast.success('Categoria cadastrada!');
				formRef.current.reset();
			} else {
				toast.error('Falha no cadastro');
			}

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
								<CardBody className="px-lg-5 py-lg-5">
									<Form ref={formRef} onSubmit={handleSubmit}>

										<Input
											name="ctg_descricao"
											type="text"
											placeholder="Descrição da Categoria"
										/>

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
