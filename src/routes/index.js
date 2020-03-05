import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Rotas
import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';

//PAGES
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import DashboardMod from '../pages/DashboardMod';
import DashboardPodcaster from '../pages/DashboardPodcaster';
import Login from '../pages/Login'
import NotFound404 from '../pages/NotFound'
//Imports CSS
import "../assets/css/argon-design-system-react.css";
import "../assets/css/custom.css";


export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />

			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />

			<PrivateRouteADM path="/adm/dashboard" exact component={Dashboard} />
	
			<PrivateRoutePOD path="/podcaster/dashboard" exactc omponent={DashboardPodcaster}/>

			<Route path="/" component={NotFound404} />
		</Switch>
	);
}
