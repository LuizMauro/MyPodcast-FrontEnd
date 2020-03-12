import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';

import {
	BrowserRouter as Router,
	Route,
  } from "react-router-dom";

import Navbar from '../../components/NavbarDash/Navbar';
import Home from './contents/Home';
import Usuarios from './contents/Usuarios';
import Podcasts from './contents/Podcasts';
import Categorias from './contents/Categorias';
import Solicitacoes from './contents/Solicitacoes';
import Moderadores from './contents/Moderadores';
import Tags from './contents/Tags';
import Publicidade from './contents/Publicidade';
import Relatorio from './contents/Relatorio';


// nodejs library that concatenates classes
//import classNames from "classnames";
// react plugin used to create charts

//import { Line, Pie } from "react-chartjs-2";

// reactstrap components
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from 'reactstrap';

export default function Dashboard() {
	api.get('adm/users');

	const dispatch = useDispatch();

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<>

			<Router>
				<div>
					<Navbar />
					<Route exact path="/adm/Dashboard">
						<Home />
					</Route>
					<Route path="/adm/Dashboard/usuarios">
						<Usuarios />
					</Route>
					
					<Route path="/adm/Dashboard/podcasts">
						<Podcasts />
					</Route>

					<Route path="/adm/Dashboard/categorias">
						<Categorias />
					</Route>

					<Route path="/adm/Dashboard/solicitacoes">
						<Solicitacoes />
					</Route>

					<Route path="/adm/Dashboard/moderadores">
						<Moderadores />
					</Route>

					<Route path="/adm/Dashboard/tags">
						<Tags />
					</Route>

					<Route path="/adm/Dashboard/publicidade">
						<Publicidade />
					</Route>

					<Route path="/adm/Dashboard/relatorio">
						<Relatorio />
					</Route>

				</div>
			</Router>

		</>
	);
}
