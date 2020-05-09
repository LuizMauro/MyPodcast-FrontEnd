import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateStatusRequest } from '../../store/modules/user/actions'
//import PodcastList from '../../styles/ItemList';
//import './style.css';





// reactstrap components
import {
	Button,
	Card,
	CardBody,
	Container,
	Row,
	Col,
	CardTitle,
} from "reactstrap";


export default function Dashboard() {
    
    const [usuario, setUsuario] = useState([]);
    const [userStatus, setUserStatus] = useState(null);
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        exibirUsuarios();
        //console.log(`Teste`)
    }, []);


    

    async function exibirUsuarios() {
        const response = await api.get('/users');
        setUsuario(response.data);
        console.log("Teste"+response.data)
    }

    return (
        <>
            {console.log(usuario)}
            <section className="section section-shaped section-lg">
                <Container className="pt-lg-1">
                    <Row style={{ justifyContent: 'center' }}>
                        <Col lg="6">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody
                                    className="px-lg-5 py-lg-5"
                                    enctype="multipart/form-data"
                                >
                                    <CardTitle>Usuários do Sistema</CardTitle>
                                    <Row className="mt-1">
                                        <h1>
                                            { usuario.length }
                                        </h1>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="bg-secondary shadow border-0">
                                <CardBody
                                    className="px-lg-5 py-lg-5"
                                    enctype="multipart/form-data"
                                >
                                    <CardTitle>Usuários do Sistema</CardTitle>
                                    <Row className="mt-1">
                                        <h1>
                                            { usuario.length }
                                        </h1>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>


    )
}
