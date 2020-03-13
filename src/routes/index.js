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
import HomeAdm from '../pages/Dashboard/contents/Home';
import UsuariosAdm from '../pages/Dashboard/contents/Usuarios';
import PodcastsAdm from '../pages/Dashboard/contents/Podcasts';
import CategoriasAdm from '../pages/Dashboard/contents/Categorias';
import SolicitacoesAdm from '../pages/Dashboard/contents/Solicitacoes';
import ModeradoresAdm from '../pages/Dashboard/contents/Moderadores';
import TagsAdm from '../pages/Dashboard/contents/Tags';
import PublicidadeAdm from '../pages/Dashboard/contents/Publicidade';
import RelatorioAdm from '../pages/Dashboard/contents/Relatorio';

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

			{/* Usuario */}
			<PrivateRoute path="/Profile" component={Profile} />


			{/* MOD */}
			<PrivateRouteMOD path="/mod/dashboard" exact component={DashboardMod} />



			{/* POD  */}
			<PrivateRoutePOD
				path="/podcaster/dashboard"
				exact
				component={DashboardPodcaster}
			/>

	
			

			{/* ADM */}
			<PrivateRouteADM path="/adm/dashboard/categoria" exact component={Categoria} />
			<PrivateRouteADM exact path="/adm/dashboard" exact component={HomeAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/usuarios" exact component={UsuariosAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/podcasts" exact component={PodcastsAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/categorias" exact component={CategoriasAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/solicitacoes" exact component={SolicitacoesAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/moderadores" exact component={ModeradoresAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/tags" exact component={TagsAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/publicidade" exact component={PublicidadeAdm} />
			<PrivateRouteADM exact path="/adm/dashboard/relatorio" exact component={RelatorioAdm} />
			
					
					
					
					
					
				
			
			<Route path="/" component={NotFound404} />
		</Switch>
	);
}
