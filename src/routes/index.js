import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Rotas
import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';
import PrivateRoute from './PrivateRoute';

//PAGES
//Geral
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Pesquisar from '../pages/Pesquisar';
import NotFound404 from '../pages/NotFound';
import PodCast from '../pages/Podcast';

//Usuario
import Profile from '../pages/Profile';

//Podcaster
import DashboardPodcaster from '../pages/DashboardPodcaster';

//Moderador
import DashboardMod from '../pages/DashboardMod';

//ADM
import Dashboard from '../pages/Dashboard';
import Categoria from '../pages/Dashboard/Categoria'

//Imports CSS
import '../assets/css/argon-design-system-react.css';
import '../assets/css/custom.css';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />
			<Route path="/Pesquisar/" component={Pesquisar} />
			<Route path="/Podcast/:pod_id" component={PodCast} />

			<PrivateRoute path="/Profile" component={Profile} />

			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />

			<PrivateRouteADM path="/adm/dashboard" exact component={Dashboard} />
			<PrivateRouteADM path="/adm/dashboard/categoria" exact component={Categoria} />

			<PrivateRoutePOD
				path="/podcaster/dashboard"
				exact
				component={DashboardPodcaster}
			/>

			<Route path="/" component={NotFound404} />
		</Switch>
	);
}
