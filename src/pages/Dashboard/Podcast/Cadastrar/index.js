import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import api from "../../../../services/api";
import history from "../../../../services/history";
import { toast } from "react-toastify";
import Textarea from "../../../../components/Textarea";
import Input from "../../../../components/Input";
import FileInput from "../../../../components/FileInput/FileInput";
import { date } from "../../../../utils/Date";
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import { MdClose } from "react-icons/md";

import "./inputTag.css";

export default function Podcast() {
  const formRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [selectCategorias, setSelectCategorias] = useState([]);
  const [allCategorias, setAllCategorias] = useState([]);

  async function loadCategoria() {

    const response = await api.get('/categoria');

    setAllCategorias(response.data); 
  
  }

  useEffect(() => {
    loadCategoria();
  },[])

  function removeCategoria(cat){
    console.log(cat.ctg_id)
    //setSelectIdCategorias(selectIdCategorias.filter(item => item !== id))
    setSelectCategorias([...selectCategorias.filter((obj) => obj !== cat)]);
  }

  function setCategoria(cat){

    if(cat){
      if(selectCategorias.length === 5){
        toast.error("O podcast pode ter no máximo 5 categorias")
        return;
      }
 
      //setSelectIdCategorias([...selectIdCategorias, i])
			setSelectCategorias([...selectCategorias, cat]);
  
		}
  }


  function getFile(file){
    setPreview(URL.createObjectURL(file));
    setFile(file);

  }

  function deletePreview(){
    setPreview(null);
    setFile(null);
  }


  async function handleSubmit({
		pod_nome,
		pod_descricao,
		pod_criador,
		pod_anocriacao,
		pod_duracao,
		//ctg_id,
		end_link1,
		end_link2,
		end_link3
	}) {

	//	const list_of_categoria = ctg_id.split(',');

		if(selectCategorias.length > 5){
			toast.error('O podcast pode ter no máximo 5 categorias')
			return;
		}

    const aux =  allCategorias.filter((obj) => !selectCategorias.includes(obj));
    const arrayFinal = [];

    aux.map((item)=>{
      arrayFinal.push(item.ctg_id)

    })

    console.log("ENVIANDO PARA O BANCO -> ",arrayFinal);



		const data = new FormData();

		data.append('pod_nome', pod_nome);
		data.append('pod_descricao', pod_descricao);
		data.append('pod_criador', pod_criador);
		data.append('pod_anocriacao', pod_anocriacao);
		data.append('pod_duracao', pod_duracao);
		data.append('pod_permissao', 1);
		data.append('list_of_categoria', arrayFinal);
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
			//ctg_id: Yup.string().required('As categorias são obrigatórias'),
				end_link1: Yup.string().required('O 1º endereço é obrigatório')
			});

			const response = await api.post('/adm/criarpodcast', data);

			if(response.data.podCreated){
				toast.success('Podcast cadastrado!');
				console.log(response.data);
			}else if(response.data.nomeExists){
				toast.error('Nome de Podcast já cadastrado')
			}else if(response.data.descricaoExists){
				toast.error('Este podcast já foi cadastrado')
			}else if(response.data.linkExists){
				toast.error('Link(s) inválido(s)')
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
									<Form ref={formRef} onSubmit={handleSubmit} >
										<Row lg="12" className="mb-3">

                      <Col lg="6" xs="12">
                        {preview ? (
                          <div lg="12" xs="12" style={{ height: "100%" }}>
                            <MdClose
                              size={30}
                              color={"#fff"}
                              className="closeIcon"
                              onClick={() => deletePreview()}
                            />
                            <img
                              style={{
                                maxHeight: 400,
                                height: "100%",
                                width: "100%",
                                borderRadius: 15,
                              }}
                              src={preview}
                            />
                          </div>
                        ) : (
                          <input
                            type="file"
                            style={{ minHeight: 400 }}
                            name="pod_endereco_img"
                            type="file"
                            id="pod_endereco_img"
                            accept="image/*"
                            data-file={file}
                            onChange={(event) => getFile(event.target.files[0])}
                          ></input>
                        )}
                      </Col>

                      <Col lg="6" xs="12" className="borderBottom">
                        <h5 style={{ color: "#fff" }}>Nome do podcast</h5>
                        <Input
                          name="pod_nome"
                          type="text"
                          placeholder="Nome do Podcast"
                          required
                        />

                        <h5 style={{ color: "#fff" }}>
                          Escolha até 5 categorias
                        </h5>

                        {true && (
                           <ul id="tags" className="borderBottom">
                            {
                              allCategorias.filter((obj) => !selectCategorias.includes(obj)).map((cat) =>{
                                console.log("CAT ->", selectCategorias)

                                return(

                                  <li key={cat.ctg_id} className="tag">
                                    <span className='tag-title'>{cat.ctg_descricao}</span>
                                    <span className='tag-close-icon'
                                      onClick={() => setCategoria(cat)}
                                    >
                                      +
                                    </span>
                                  </li>
                                );
                              })}
                          </ul>
                        )}
                        <h5 style={{ color: "#fff" }}>
                          Categorias selecionadas
                        </h5>
                        <ul id="tags">

                                {  allCategorias.filter((obj) => selectCategorias.includes(obj)).map((cat) => (

                                 <>
                                  <br/>
                                  <li key={cat.id} className="tag">
                                    <span className='tag-title'>{cat.ctg_descricao}</span>
                                    <span className='tag-close-icon'
                                      onClick={() => removeCategoria(cat)}
                                    >
                                      x
                                    </span>
                                  </li>
                                  </>
                                ))}
                        </ul>
                      </Col>
                    </Row>

                    <Row className="borderBottom">
                      <Col lg="12" xs="12">
                        <h5 style={{ color: "#fff" }}>Descrição</h5>
                        <Textarea
                          name="pod_descricao"
                          type="text"
                          placeholder="Descreva o seu podcast em até 600 caracteres!"
                          style={{ minHeight: 200 }}
                          required
                        />
                      </Col>
                    </Row>

                    <Row lg="12" className="borderBottom">
                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Ano de criação</h5>
                        <Input
                          name="pod_anocriacao"
                          type="number"
                          required
                          placeholder="Ano de criação"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Nome do criador</h5>
                        <Input
                          name="pod_criador"
                          type="text"
                          required
                          placeholder="Nome do criador"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Média de duração</h5>
                        <Input
                          name="pod_duracao"
                          type="number"
                          required
                          placeholder="Média de duração em minutos"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 1</h5>
                        <Input
                          name="end_link1"
                          type="text"
                          placeholder="Endereço 1 do Podcast"
                          required
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 2</h5>
                        <Input
                          name="end_link2"
                          type="text"
                          placeholder="Endereço 2 do Podcast"
                        />
                      </Col>

                      <Col lg="4" xs="12">
                        <h5 style={{ color: "#fff" }}>Endereço 3</h5>
                        <Input
                          name="end_link3"
                          type="text"
                          placeholder="Endereço 3 do Podcast"
                        />
                      </Col>
                    </Row>


										<div className="text-center">
											<Button type="submit" className="my-2"  color="primary">
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

