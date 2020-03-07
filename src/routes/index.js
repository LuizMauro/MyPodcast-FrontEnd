import React from 'react';
import { Switch, Route } from 'react-router-dom';

//Rotas

import Profile from '../pages/Profile';

import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';
import PrivateRoute from './PrivateRoute';

//PAGES
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import DashboardMod from '../pages/DashboardMod';
import DashboardPodcaster from '../pages/DashboardPodcaster';
import Login from '../pages/Login';
import NotFound404 from '../pages/NotFound';
import PodCast from '../pages/Podcast'
//Imports CSS
import '../assets/css/argon-design-system-react.css';
import '../assets/css/custom.css';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />
			<Route path="/Podcast" component={PodCast} />

			<PrivateRoute path="/Profile" component={Profile} />

			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />

			<PrivateRouteADM path="/adm/dashboard" exact component={Dashboard} />

			<PrivateRoutePOD
				path="/podcaster/dashboard"
				exact
				component={DashboardPodcaster}
			/>

		

			<Route path="/" component={NotFound404} />
		</Switch>
	);
}
