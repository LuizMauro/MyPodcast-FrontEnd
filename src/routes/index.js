import React from 'react';
import { Switch, Route } from 'react-router-dom';

<<<<<<< HEAD
//Rotas
=======
import Home from '../pages/examples/Teste';
import Cadastro from '../pages/Cadastro';

import Profile from '../pages/Profile';

import DashboardPodcaster from '../pages/DashboardPodcaster';
import DashboardMod from '../pages/DashboardMod';
import Dashboard from '../pages/Dashboard';

>>>>>>> guilherme
import PrivateRouteADM from './PrivateRouteADM';
import PrivateRouteMOD from './PrivateRouteMOD';
import PrivateRoutePOD from './PrivateRoutePod';
import PrivateRoute from './PrivateRoute';

<<<<<<< HEAD
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

=======
import Login from '../pages/examples/Login';

import '../assets/css/argon-design-system-react.css';
import '../assets/css/custom.css';
>>>>>>> guilherme

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/Cadastro" component={Cadastro} />
			<Route path="/Login" component={Login} />

			<PrivateRoute path="/Profile" component={Profile}/>

			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />

			<PrivateRouteADM path="/adm/dashboard" exact component={Dashboard} />
<<<<<<< HEAD
	
			<PrivateRoutePOD path="/podcaster/dashboard" exactc omponent={DashboardPodcaster}/>
=======

			<PrivateRoutePOD
				path="/podcaster/dashboard"
				exact
				component={DashboardPodcaster}
			/>
>>>>>>> guilherme

			<Route path="/" component={NotFound404} />
		</Switch>
	);
}
